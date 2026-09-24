// Chat History Service - Manages persistent chat storage

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  attachments?: any[];
}

const STORAGE_KEY = 'nytrix_chat_history';
const CURRENT_SESSION_KEY = 'nytrix_current_session';

// Get all chat sessions
export const getAllSessions = (): ChatSession[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const sessions = JSON.parse(stored);
      // Sort by updatedAt descending (most recent first)
      return sessions.sort((a: ChatSession, b: ChatSession) => b.updatedAt - a.updatedAt);
    }
  } catch (e) {
    console.error('Error loading chat sessions:', e);
  }
  return [];
};

// Get a specific session by ID
export const getSession = (sessionId: string): ChatSession | null => {
  const sessions = getAllSessions();
  return sessions.find(s => s.id === sessionId) || null;
};

// Create a new chat session
export const createSession = (): ChatSession => {
  const newSession: ChatSession = {
    id: `session_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    title: 'New Chat',
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  
  const sessions = getAllSessions();
  sessions.unshift(newSession);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  setCurrentSessionId(newSession.id);
  
  return newSession;
};

// Update a session with new messages
export const updateSession = (sessionId: string, messages: ChatMessage[]): void => {
  const sessions = getAllSessions();
  const index = sessions.findIndex(s => s.id === sessionId);
  
  if (index !== -1) {
    sessions[index].messages = messages;
    sessions[index].updatedAt = Date.now();
    
    // Auto-generate title from first user message if title is "New Chat"
    if (sessions[index].title === 'New Chat' && messages.length > 0) {
      const firstUserMessage = messages.find(m => m.role === 'user');
      if (firstUserMessage) {
        sessions[index].title = generateTitle(firstUserMessage.content);
      }
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } else {
    // Create new session if not found
    const newSession: ChatSession = {
      id: sessionId,
      title: messages.length > 0 ? generateTitle(messages[0].content) : 'New Chat',
      messages,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    sessions.unshift(newSession);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }
};

// Rename a session
export const renameSession = (sessionId: string, newTitle: string): void => {
  const sessions = getAllSessions();
  const index = sessions.findIndex(s => s.id === sessionId);
  
  if (index !== -1) {
    sessions[index].title = newTitle;
    sessions[index].updatedAt = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }
};

// Delete a session
export const deleteSession = (sessionId: string): void => {
  const sessions = getAllSessions();
  const filtered = sessions.filter(s => s.id !== sessionId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  
  // If deleted session was current, clear current session
  if (getCurrentSessionId() === sessionId) {
    localStorage.removeItem(CURRENT_SESSION_KEY);
  }
};

// Delete all sessions
export const clearAllSessions = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(CURRENT_SESSION_KEY);
};

// Get current session ID
export const getCurrentSessionId = (): string | null => {
  return localStorage.getItem(CURRENT_SESSION_KEY);
};

// Set current session ID
export const setCurrentSessionId = (sessionId: string): void => {
  localStorage.setItem(CURRENT_SESSION_KEY, sessionId);
};

// Generate a title from message content
const generateTitle = (content: string): string => {
  // Remove special characters and trim
  const cleaned = content
    .replace(/\[.*?\]/g, '') // Remove [Image: ...] etc
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Take first 40 characters
  if (cleaned.length > 40) {
    return cleaned.substring(0, 40) + '...';
  }
  return cleaned || 'New Chat';
};

// Format timestamp for display
export const formatTimestamp = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 7) {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  } else if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return 'Just now';
  }
};

// Group sessions by date
export const groupSessionsByDate = (sessions: ChatSession[]): Record<string, ChatSession[]> => {
  const groups: Record<string, ChatSession[]> = {
    'Today': [],
    'Yesterday': [],
    'This Week': [],
    'Earlier': []
  };
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  for (const session of sessions) {
    const sessionDate = new Date(session.updatedAt);
    
    if (sessionDate >= today) {
      groups['Today'].push(session);
    } else if (sessionDate >= yesterday) {
      groups['Yesterday'].push(session);
    } else if (sessionDate >= weekAgo) {
      groups['This Week'].push(session);
    } else {
      groups['Earlier'].push(session);
    }
  }
  
  return groups;
};

// Export chat as JSON
export const exportSession = (sessionId: string): string | null => {
  const session = getSession(sessionId);
  if (session) {
    return JSON.stringify(session, null, 2);
  }
  return null;
};

// Import chat from JSON
export const importSession = (jsonData: string): ChatSession | null => {
  try {
    const session = JSON.parse(jsonData) as ChatSession;
    // Generate new ID to avoid conflicts
    session.id = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    session.updatedAt = Date.now();
    
    const sessions = getAllSessions();
    sessions.unshift(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    
    return session;
  } catch (e) {
    console.error('Error importing session:', e);
    return null;
  }
};
