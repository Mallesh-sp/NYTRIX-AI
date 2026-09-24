import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  ChevronRight,
  Clock,
  History,
  Search,
  MoreVertical,
  Download,
  Upload
} from 'lucide-react';
import {
  ChatSession,
  getAllSessions,
  deleteSession,
  renameSession,
  groupSessionsByDate,
  formatTimestamp,
  clearAllSessions,
  exportSession
} from '../services/chatHistoryService';

interface ChatHistorySidebarProps {
  currentSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
  onSessionsChange?: () => void;
}

const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({
  currentSessionId,
  onSelectSession,
  onNewChat,
  onSessionsChange
}) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  // Load sessions on mount and when sessions change
  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const allSessions = getAllSessions();
    setSessions(allSessions);
  };

  // Refresh sessions periodically
  useEffect(() => {
    const interval = setInterval(loadSessions, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this conversation?')) {
      deleteSession(sessionId);
      loadSessions();
      onSessionsChange?.();
      setShowDropdown(null);
    }
  };

  const handleRename = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setEditingId(sessionId);
      setEditTitle(session.title);
      setShowDropdown(null);
    }
  };

  const handleSaveRename = (sessionId: string) => {
    if (editTitle.trim()) {
      renameSession(sessionId, editTitle.trim());
      loadSessions();
      onSessionsChange?.();
    }
    setEditingId(null);
    setEditTitle('');
  };

  const handleExport = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const jsonData = exportSession(sessionId);
    if (jsonData) {
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nytrix-chat-${sessionId.substring(0, 8)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    setShowDropdown(null);
  };

  const handleClearAll = () => {
    if (window.confirm('Delete ALL chat history? This cannot be undone.')) {
      clearAllSessions();
      loadSessions();
      onSessionsChange?.();
      onNewChat();
    }
  };

  // Filter sessions by search query
  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.messages.some(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const groupedSessions = groupSessionsByDate(filteredSessions);

  if (collapsed) {
    return (
      <div className="w-14 flex-shrink-0 bg-[#0f1219] border-r border-white/[0.06] flex flex-col">
        <button
          onClick={() => setCollapsed(false)}
          className="p-4 hover:bg-white/5 transition-colors"
          title="Expand History"
        >
          <History className="w-5 h-5 text-slate-400" />
        </button>
        <button
          onClick={onNewChat}
          className="p-4 hover:bg-white/5 transition-colors border-b border-white/[0.06]"
          title="New Chat"
        >
          <Plus className="w-5 h-5 text-blue-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-72 flex-shrink-0 bg-[#0f1219] border-r border-white/[0.06] flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-400" />
            <h2 className="text-sm font-semibold text-white">Chat History</h2>
          </div>
          <button
            onClick={() => setCollapsed(true)}
            className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            title="Collapse"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {Object.entries(groupedSessions).map(([group, groupSessions]) => {
          if (groupSessions.length === 0) return null;
          
          return (
            <div key={group} className="mb-4">
              <div className="px-2 py-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                {group}
              </div>
              
              <AnimatePresence>
                {groupSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative"
                  >
                    <button
                      onClick={() => onSelectSession(session.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 group transition-all ${
                        currentSessionId === session.id
                          ? 'bg-blue-500/20 border border-blue-500/30'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <MessageSquare className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          currentSessionId === session.id ? 'text-blue-400' : 'text-slate-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          {editingId === session.id ? (
                            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="flex-1 px-2 py-0.5 bg-white/10 border border-blue-500/50 rounded text-xs text-white focus:outline-none"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveRename(session.id);
                                  if (e.key === 'Escape') setEditingId(null);
                                }}
                              />
                              <button
                                onClick={() => handleSaveRename(session.id)}
                                className="p-1 text-green-400 hover:text-green-300"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="p-1 text-red-400 hover:text-red-300"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <p className={`text-xs font-medium truncate ${
                                currentSessionId === session.id ? 'text-white' : 'text-slate-300'
                              }`}>
                                {session.title}
                              </p>
                              <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3" />
                                {formatTimestamp(session.updatedAt)}
                                <span className="text-slate-600">•</span>
                                {session.messages.length} msgs
                              </p>
                            </>
                          )}
                        </div>
                        
                        {/* Dropdown menu */}
                        {editingId !== session.id && (
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowDropdown(showDropdown === session.id ? null : session.id);
                              }}
                              className={`p-1 rounded text-slate-500 hover:text-white hover:bg-white/10 transition-colors ${
                                showDropdown === session.id ? 'bg-white/10 text-white' : 'opacity-0 group-hover:opacity-100'
                              }`}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            
                            {showDropdown === session.id && (
                              <div 
                                className="absolute right-0 top-full mt-1 w-36 bg-[#1a1f2e] border border-white/10 rounded-lg shadow-xl z-50 py-1"
                                onClick={e => e.stopPropagation()}
                              >
                                <button
                                  onClick={() => handleRename(session.id)}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 hover:text-white"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  Rename
                                </button>
                                <button
                                  onClick={(e) => handleExport(session.id, e)}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 hover:text-white"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  Export
                                </button>
                                <div className="border-t border-white/10 my-1" />
                                <button
                                  onClick={(e) => handleDelete(session.id, e)}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          );
        })}
        
        {filteredSessions.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-500">
              {searchQuery ? 'No matching conversations' : 'No conversations yet'}
            </p>
            <p className="text-[10px] text-slate-600 mt-1">
              Start a new chat to begin
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {sessions.length > 0 && (
        <div className="p-3 border-t border-white/[0.06]">
          <button
            onClick={handleClearAll}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All History
          </button>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(null)}
        />
      )}
    </div>
  );
};

export default ChatHistorySidebar;
