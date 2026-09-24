import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot,
  User,
  Download,
  Trash2,
  Copy,
  Check,
  Sparkles,
  Scale,
  MessageSquare,
  RefreshCw,
  FileText
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatInterfaceProps {
  onBack?: () => void;
}

const BACKEND_URL = 'http://localhost:5000';

const ChatInterface: React.FC<ChatInterfaceProps> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Generate session ID on mount and load history from localStorage
  useEffect(() => {
    const storedSessionId = localStorage.getItem('nytrix_session_id');
    const newSessionId = storedSessionId || `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    if (!storedSessionId) {
      localStorage.setItem('nytrix_session_id', newSessionId);
    }
    setSessionId(newSessionId);

    // Load chat history from localStorage
    const storedMessages = localStorage.getItem(`nytrix_chat_${newSessionId}`);
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(parsedMessages);
      } catch (e) {
        console.error('Error loading chat history:', e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (sessionId && messages.length > 0) {
      localStorage.setItem(`nytrix_chat_${sessionId}`, JSON.stringify(messages));
    }
  }, [messages, sessionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId: sessionId
        })
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: `msg_${Date.now()}`,
          role: 'assistant',
          content: data.message,
          timestamp: data.timestamp || Date.now()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: "I'm sorry, I couldn't process your request right now. Please make sure the backend server is running and try again. 🙏",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      setMessages([]);
      localStorage.removeItem(`nytrix_chat_${sessionId}`);
      
      // Clear on backend too
      fetch(`${BACKEND_URL}/api/chat/history/${sessionId}`, {
        method: 'DELETE'
      }).catch(console.error);
    }
  };

  // PDF Download Function
  const downloadChatAsPDF = async () => {
    if (messages.length === 0) return;
    
    setIsDownloading(true);
    
    try {
      // Create HTML content for PDF
      const exportDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      
      let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Nytrix AI - Chat Export</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      background: #f8fafc; 
      padding: 40px;
      color: #1e293b;
    }
    .header { 
      text-align: center; 
      margin-bottom: 30px; 
      padding-bottom: 20px;
      border-bottom: 2px solid #3b82f6;
    }
    .logo { 
      font-size: 28px; 
      font-weight: bold; 
      color: #3b82f6;
      margin-bottom: 5px;
    }
    .subtitle { 
      font-size: 12px; 
      color: #64748b; 
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .export-info {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 10px;
    }
    .messages { margin: 20px 0; }
    .message { 
      margin-bottom: 20px; 
      display: flex;
      gap: 12px;
    }
    .message.user { justify-content: flex-end; }
    .message.user .bubble { 
      background: linear-gradient(135deg, #3b82f6, #0ea5e9);
      color: white;
      border-radius: 16px 16px 4px 16px;
    }
    .message.assistant .bubble { 
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px 16px 16px 4px;
    }
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      flex-shrink: 0;
    }
    .avatar.user { 
      background: linear-gradient(135deg, #8b5cf6, #ec4899);
      color: white;
      order: 1;
    }
    .avatar.assistant { 
      background: linear-gradient(135deg, #3b82f6, #0ea5e9);
      color: white;
    }
    .bubble { 
      max-width: 70%;
      padding: 14px 18px;
    }
    .bubble .sender {
      font-size: 11px;
      font-weight: 600;
      margin-bottom: 6px;
      opacity: 0.7;
    }
    .bubble .content { 
      font-size: 14px; 
      line-height: 1.6;
      white-space: pre-wrap;
    }
    .bubble .time {
      font-size: 10px;
      opacity: 0.5;
      margin-top: 8px;
      text-align: right;
    }
    .disclaimer { 
      margin-top: 40px; 
      padding: 20px;
      background: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 12px;
      font-size: 12px;
      color: #92400e;
    }
    .disclaimer strong { color: #b45309; }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #94a3b8;
    }
    @media print {
      body { padding: 20px; }
      .message { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">⚖️ NYTRIX AI INDIA</div>
    <div class="subtitle">Legal Intelligence Platform</div>
    <div class="export-info">Chat Export • ${exportDate}</div>
  </div>
  
  <div class="messages">`;

      messages.forEach((msg) => {
        const time = new Date(msg.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        const sender = msg.role === 'user' ? 'You' : 'Nytrix AI';
        const avatarText = msg.role === 'user' ? '👤' : '🤖';
        
        htmlContent += `
    <div class="message ${msg.role}">
      <div class="avatar ${msg.role}">${avatarText}</div>
      <div class="bubble">
        <div class="sender">${sender}</div>
        <div class="content">${msg.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        <div class="time">${time}</div>
      </div>
    </div>`;
      });

      htmlContent += `
  </div>
  
  <div class="disclaimer">
    <strong>⚠️ DISCLAIMER:</strong> This conversation contains AI-generated legal information for educational purposes only. 
    The information provided should not be considered as professional legal advice. 
    Please consult a qualified lawyer for professional guidance on your specific legal matters.
  </div>
  
  <div class="footer">
    Generated by Nytrix AI India • Team JKM<br>
    ${exportDate}
  </div>
</body>
</html>`;

      // Create a new window for printing as PDF
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        // Wait for content to load, then trigger print dialog
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print();
          }, 250);
        };
      } else {
        // Fallback: download as HTML file that can be converted to PDF
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nytrix-chat-${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('Please open the downloaded HTML file and use "Print to PDF" to save as PDF.');
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const copyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, i) => <span key={i}>{line}<br /></span>);
  };

  const suggestedQuestions = [
    "What are my rights if I'm falsely accused?",
    "How do I file a consumer complaint?",
    "What is bail and how does it work?",
    "Explain cyber harassment laws in India"
  ];

  return (
    <div className="h-full min-h-0 flex flex-col bg-[#0a0d14]">
      {/* Header - Mobile Optimized */}
      <header className="flex-shrink-0 bg-[#0a0d14]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-semibold text-white">Nytrix AI</h1>
              <p className="text-[10px] sm:text-xs text-gray-400">Legal Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {messages.length > 0 && (
              <>
                <button
                  onClick={downloadChatAsPDF}
                  disabled={isDownloading}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center gap-1 disabled:opacity-50"
                  title="Download as PDF"
                >
                  {isDownloading ? (
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  <span className="hidden sm:inline text-xs">PDF</span>
                </button>
                <button
                  onClick={clearChat}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                  title="Clear chat"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Chat Container - Mobile Optimized */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          {/* Empty State */}
          {messages.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] text-center px-2"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 sm:mb-6 border border-blue-500/30">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Welcome to Nytrix AI</h2>
              <p className="text-sm sm:text-base text-gray-400 max-w-md mb-6 sm:mb-8 px-4">
                I'm your personal legal assistant. Ask me anything about Indian laws or any situation you need guidance on.
              </p>
              
              {/* Suggested Questions - Mobile Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full max-w-xl">
                {suggestedQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setInput(question)}
                    className="p-3 sm:p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-left text-xs sm:text-sm text-gray-300 hover:text-white transition-all hover:border-blue-500/30"
                  >
                    <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-1.5 sm:mb-2 text-blue-400" />
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Messages - Mobile Optimized */}
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex gap-2 sm:gap-4 mb-4 sm:mb-6 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                )}
                
                <div className={`group relative max-w-[85%] sm:max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                  <div
                    className={`p-3 sm:p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-white/10 text-gray-100 rounded-bl-md border border-white/10'
                    }`}
                  >
                    <div className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                  
                  {/* Message Actions - Touch Friendly */}
                  <div className={`absolute -bottom-5 sm:-bottom-6 ${message.role === 'user' ? 'right-0' : 'left-0'} flex items-center gap-2 opacity-0 group-hover:opacity-100 sm:transition-opacity`}>
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button
                      onClick={() => copyMessage(message.content, message.id)}
                      className="p-1 rounded hover:bg-white/10 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {copiedId === message.id ? (
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center order-2">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading Indicator - Mobile */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 sm:gap-4 mb-4 sm:mb-6"
            >
              <div className="flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-md p-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 animate-spin" />
                  <span className="text-gray-400 text-xs sm:text-sm">Nytrix is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Mobile Optimized */}
      <div className="flex-shrink-0 bg-[#0a0d14]/95 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            className="relative flex items-end gap-2 sm:gap-3"
          >
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Indian laws..."
                rows={1}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all"
                style={{ maxHeight: '120px' }}
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>
          
          <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-3">
            AI legal info for education only. Consult a lawyer for advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
