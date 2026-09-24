import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  Shield,
  MessageSquare,
  RefreshCw,
  FileText,
  Mic,
  MicOff,
  Paperclip,
  Image as ImageIcon,
  File,
  X,
  History,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import ChatHistorySidebar from './ChatHistorySidebar';
import {
  ChatSession,
  getAllSessions,
  getSession,
  createSession,
  updateSession,
  getCurrentSessionId,
  setCurrentSessionId
} from '../services/chatHistoryService';

// Speech Recognition Types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  preview?: string;
  base64?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  attachments?: UploadedFile[];
}

interface ChatInterfaceProps {
  onBack?: () => void;
}

const BACKEND_URL = (import.meta as any).env?.VITE_BACKEND_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

const ChatInterface: React.FC<ChatInterfaceProps> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check for speech recognition support
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      setSpeechSupported(true);
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-IN'; // Indian English

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setInput(prev => prev + finalTranscript + ' ');
        }
      };

      recognitionRef.current.onerror = (event: Event) => {
        console.error('Speech recognition error:', event);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  // Toggle voice recording
  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Limit file size to 10MB
      if (file.size > 10 * 1024 * 1024) {
        alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
        continue;
      }

      // Only allow images and documents
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'text/plain', 
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!allowedTypes.includes(file.type)) {
        alert(`File type "${file.type}" is not supported. Please upload images or documents.`);
        continue;
      }

      const uploadedFile: UploadedFile = {
        id: `file_${Date.now()}_${i}`,
        name: file.name,
        type: file.type,
        size: file.size
      };

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedFile.preview = e.target?.result as string;
          uploadedFile.base64 = e.target?.result as string;
          setUploadedFiles(prev => [...prev.filter(f => f.id !== uploadedFile.id), uploadedFile]);
        };
        reader.readAsDataURL(file);
      } else {
        // For documents, read as base64
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedFile.base64 = e.target?.result as string;
          setUploadedFiles(prev => [...prev.filter(f => f.id !== uploadedFile.id), uploadedFile]);
        };
        reader.readAsDataURL(file);
      }

      newFiles.push(uploadedFile);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Remove uploaded file
  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Generate session ID on mount and load history from localStorage
  useEffect(() => {
    // Check for existing session or create new one
    const existingSessionId = getCurrentSessionId();
    
    if (existingSessionId) {
      const existingSession = getSession(existingSessionId);
      if (existingSession) {
        setSessionId(existingSessionId);
        setMessages(existingSession.messages as Message[]);
        return;
      }
    }
    
    // Create new session if none exists
    const newSession = createSession();
    setSessionId(newSession.id);
    setMessages([]);
  }, []);

  // Save messages to history service whenever they change
  useEffect(() => {
    if (sessionId && messages.length > 0) {
      updateSession(sessionId, messages);
    }
  }, [messages, sessionId]);

  // Handle session selection from sidebar
  const handleSelectSession = useCallback((selectedSessionId: string) => {
    const session = getSession(selectedSessionId);
    if (session) {
      setSessionId(selectedSessionId);
      setCurrentSessionId(selectedSessionId);
      setMessages(session.messages as Message[]);
      setInput('');
      setUploadedFiles([]);
    }
  }, []);

  // Handle creating a new chat
  const handleNewChat = useCallback(() => {
    const newSession = createSession();
    setSessionId(newSession.id);
    setMessages([]);
    setInput('');
    setUploadedFiles([]);
  }, []);

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
    if ((!input.trim() && uploadedFiles.length === 0) || isLoading) return;

    // Build message content with file descriptions
    let messageContent = input.trim();
    const attachments = [...uploadedFiles];
    
    if (attachments.length > 0) {
      const fileDescriptions = attachments.map(f => {
        if (f.type.startsWith('image/')) {
          return `[Image: ${f.name}]`;
        } else if (f.type === 'application/pdf') {
          return `[PDF Document: ${f.name}]`;
        } else {
          return `[Document: ${f.name}]`;
        }
      }).join(', ');
      
      if (messageContent) {
        messageContent = `${messageContent}\n\nAttached: ${fileDescriptions}`;
      } else {
        messageContent = `Please analyze the attached: ${fileDescriptions}`;
      }
    }

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: Date.now(),
      attachments: attachments.length > 0 ? attachments : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setUploadedFiles([]);
    setIsLoading(true);

    try {
      // Prepare request body with files
      const requestBody: any = {
        message: messageContent,
        sessionId: sessionId
      };

      // Include file data for analysis
      if (attachments.length > 0) {
        requestBody.files = attachments.map(f => ({
          name: f.name,
          type: f.type,
          base64: f.base64
        }));
      }

      const response = await fetch(`${BACKEND_URL}/api/chat/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
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
    if (window.confirm('Are you sure you want to clear this chat? You can start a new chat instead.')) {
      setMessages([]);
      if (sessionId) {
        updateSession(sessionId, []);
      }
      
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

  const renderInlineMarkdown = (text: string) => {
    // Handle <br> tags properly so they break lines cleanly
    const brSplit = text.split(/<br\s*\/?>/gi);
    return brSplit.map((segment, brIdx) => {
      // Split by bold (**text**) and inline code (`code`)
      const parts = segment.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
      const renderedParts = parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-bold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={index} className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-mono text-[12px]">
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      });

      return (
        <React.Fragment key={brIdx}>
          {brIdx > 0 && <br className="my-1" />}
          {renderedParts}
        </React.Fragment>
      );
    });
  };

  const parseTableRow = (line: string): string[] => {
    let trimmed = line.trim();
    if (trimmed.startsWith('|')) trimmed = trimmed.slice(1);
    if (trimmed.endsWith('|')) trimmed = trimmed.slice(0, -1);
    return trimmed.split('|').map(c => c.trim());
  };

  const isDividerRow = (line: string): boolean => {
    const cells = parseTableRow(line);
    return cells.length > 0 && cells.every(c => /^:?-+:?$/.test(c));
  };

  const formatMessage = (content: string) => {
    const lines = content.split('\n');
    const blocks: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      // Table Detection: check if current line has '|' and next line is a divider
      if (trimmed.includes('|') && i + 1 < lines.length && isDividerRow(lines[i + 1])) {
        const headerCells = parseTableRow(trimmed);
        i += 2; // skip header and divider row
        const bodyRows: string[][] = [];

        while (i < lines.length && lines[i].trim().includes('|') && lines[i].trim() !== '') {
          bodyRows.push(parseTableRow(lines[i]));
          i++;
        }

        blocks.push(
          <div key={`table-${i}`} className="my-3.5 overflow-x-auto rounded-xl border border-white/15 bg-white/[0.03] shadow-xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.08]">
                  {headerCells.map((h, idx) => (
                    <th key={idx} className="py-2.5 px-3.5 font-bold text-cyan-300 uppercase tracking-wider text-[11px] sm:text-xs">
                      {renderInlineMarkdown(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.04] transition-colors odd:bg-transparent even:bg-white/[0.01]">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-2.5 px-3.5 text-gray-200 leading-relaxed align-top">
                        {renderInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Blockquotes / Callout lines starting with >
      if (trimmed.startsWith('> ')) {
        blocks.push(
          <div key={`quote-${i}`} className="my-2.5 p-3 rounded-lg border-l-4 border-cyan-400 bg-cyan-950/30 text-cyan-200 text-xs sm:text-sm leading-relaxed">
            {renderInlineMarkdown(trimmed.slice(2))}
          </div>
        );
        i++;
        continue;
      }

      // Horizontal Rule
      if (trimmed === '---' || trimmed === '***') {
        blocks.push(<hr key={`hr-${i}`} className="border-white/15 my-3" />);
        i++;
        continue;
      }

      // Headings
      if (trimmed.startsWith('### ')) {
        blocks.push(
          <h3 key={`h3-${i}`} className="text-sm sm:text-base font-bold text-cyan-400 mt-4 mb-2 flex items-center gap-1.5">
            {renderInlineMarkdown(trimmed.slice(4))}
          </h3>
        );
        i++;
        continue;
      }
      if (trimmed.startsWith('## ')) {
        blocks.push(
          <h2 key={`h2-${i}`} className="text-base sm:text-lg font-bold text-white mt-4 mb-2 border-b border-white/15 pb-1.5">
            {renderInlineMarkdown(trimmed.slice(3))}
          </h2>
        );
        i++;
        continue;
      }
      if (trimmed.startsWith('# ')) {
        blocks.push(
          <h1 key={`h1-${i}`} className="text-lg sm:text-xl font-extrabold text-white mt-5 mb-2.5">
            {renderInlineMarkdown(trimmed.slice(2))}
          </h1>
        );
        i++;
        continue;
      }

      // Checklist items: * [x] or * [ ]
      if (trimmed.startsWith('* [x]') || trimmed.startsWith('- [x]')) {
        blocks.push(
          <div key={`chk-${i}`} className="flex items-start gap-2 my-1 text-xs sm:text-sm text-green-300">
            <span className="text-green-400 font-bold mt-0.5">✓</span>
            <span className="leading-relaxed">{renderInlineMarkdown(trimmed.slice(5).trim())}</span>
          </div>
        );
        i++;
        continue;
      }
      if (trimmed.startsWith('* [ ]') || trimmed.startsWith('- [ ]')) {
        blocks.push(
          <div key={`chk-${i}`} className="flex items-start gap-2 my-1 text-xs sm:text-sm text-gray-400">
            <span className="text-gray-500 font-bold mt-0.5">○</span>
            <span className="leading-relaxed">{renderInlineMarkdown(trimmed.slice(5).trim())}</span>
          </div>
        );
        i++;
        continue;
      }

      // Numbered list: 1. or 1)
      const numMatch = trimmed.match(/^(\d+)[.)]\s+(.*)/);
      if (numMatch) {
        blocks.push(
          <div key={`num-${i}`} className="flex items-start gap-2.5 my-1.5 text-xs sm:text-sm">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] flex items-center justify-center font-bold mt-0.5 border border-blue-500/40">
              {numMatch[1]}
            </span>
            <span className="flex-1 leading-relaxed text-gray-200">{renderInlineMarkdown(numMatch[2])}</span>
          </div>
        );
        i++;
        continue;
      }

      // Bullet items: * or -
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        blocks.push(
          <div key={`bullet-${i}`} className="flex items-start gap-2 my-1 text-xs sm:text-sm leading-relaxed">
            <span className="text-cyan-400 mt-1">•</span>
            <span className="flex-1 text-gray-200">{renderInlineMarkdown(trimmed.slice(2))}</span>
          </div>
        );
        i++;
        continue;
      }

      // Empty line
      if (!trimmed) {
        blocks.push(<div key={`empty-${i}`} className="h-2" />);
        i++;
        continue;
      }

      // Regular paragraph
      blocks.push(
        <p key={`p-${i}`} className="my-1 text-xs sm:text-sm leading-relaxed text-gray-200">
          {renderInlineMarkdown(line)}
        </p>
      );
      i++;
    }

    return blocks;
  };

  const suggestedQuestions = [
    "False 498A / பொய் வழக்கு: என் சட்ட உரிமைகள் & நான் என்ன செய்ய வேண்டும்?",
    "பணம் ஏமாற்றிவிட்டார்கள் / Cheating (420): என்ன சட்ட நடவடிக்கை எடுக்கலாம்?",
    "Cyber Blackmail / போட்டோ மிரட்டல்: என்ன சட்டம் பொருந்தும் & எப்படி புகார் அளிப்பது?",
    "போலீஸ் பொய் வழக்கு / Arrest Threat: உச்ச நீதிமன்ற வழிகாட்டுதல்கள் என்ன?"
  ];

  return (
    <div className="h-full min-h-0 flex bg-[#0a0d14]">
      {/* Chat History Sidebar */}
      {showHistory && (
        <ChatHistorySidebar
          currentSessionId={sessionId}
          onSelectSession={handleSelectSession}
          onNewChat={handleNewChat}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
      {/* Header - Mobile Optimized */}
      <header className="flex-shrink-0 bg-[#0a0d14]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Toggle History Sidebar Button */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title={showHistory ? "Hide History" : "Show History"}
            >
              {showHistory ? (
                <PanelLeftClose className="w-5 h-5" />
              ) : (
                <PanelLeft className="w-5 h-5" />
              )}
            </button>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-semibold text-white">Nytrix AI</h1>
              <p className="text-[10px] sm:text-xs text-gray-400">Legal Intelligence & Action Assistant</p>
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
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Welcome to Nytrix AI Legal Intelligence</h2>
              <p className="text-sm sm:text-base text-gray-400 max-w-lg mb-4 px-4">
                உங்கள் சட்டப் பிரச்சனை அல்லது கேள்விகளை (English, தமிழ் அல்லது Tanglish) உள்ளிடுங்கள். உடனடியாக முழுமையான சட்ட தீர்வுகள் வழங்கப்படும்.
              </p>

              {/* 3 Core Pillars Banner */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-xl">
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-blue-500/10 border border-blue-500/30 text-blue-300 flex items-center gap-1.5">
                  <Scale className="w-3 h-3 text-blue-400" /> ⚖️ பொருந்தும் சட்டங்கள் (Laws)
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-cyan-400" /> 🚨 சட்ட நடவடிக்கைகள் (Legal Actions)
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400" /> 📋 என்ன செய்ய வேண்டும் (What to Do)
                </span>
              </div>
              
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
                
                <div className={`group relative ${message.role === 'user' ? 'max-w-[85%] sm:max-w-[75%] order-1' : 'w-full max-w-[96%] sm:max-w-[92%]'}`}>
                  <div
                    className={`p-3.5 sm:p-5 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md shadow-md'
                        : 'bg-white/[0.06] text-gray-100 rounded-bl-md border border-white/10 shadow-xl backdrop-blur-md'
                    }`}
                  >
                    {/* Attachment Previews */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {message.attachments.map((file) => (
                          <div key={file.id} className="relative">
                            {file.preview ? (
                              <img
                                src={file.preview}
                                alt={file.name}
                                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-white/20"
                              />
                            ) : (
                              <div className="w-24 h-16 sm:w-32 sm:h-20 bg-white/10 rounded-lg border border-white/20 flex flex-col items-center justify-center gap-1">
                                <File className="w-5 h-5 text-blue-300" />
                                <span className="text-[10px] text-white/70 truncate max-w-[90%] px-1">{file.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="text-sm sm:text-[15px] leading-relaxed">
                      {formatMessage(message.content)}
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
          {/* File Previews */}
          {uploadedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="relative flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg"
                >
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center">
                      <File className="w-5 h-5 text-blue-400" />
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-white truncate max-w-[120px]">{file.name}</span>
                    <span className="text-[10px] text-gray-500">{formatFileSize(file.size)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            className="relative flex items-end gap-2 sm:gap-3"
          >
            {/* File Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.txt,.doc,.docx"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all"
              title="Upload document or photo"
              disabled={isLoading}
            >
              <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Voice Recording Button */}
            {speechSupported && (
              <button
                type="button"
                onClick={toggleRecording}
                className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center transition-all ${
                  isRecording
                    ? 'bg-red-500/20 border-red-500/50 text-red-400 animate-pulse'
                    : 'bg-white/10 border-white/20 text-gray-400 hover:text-white hover:bg-white/20 hover:border-white/30'
                }`}
                title={isRecording ? 'Stop recording' : 'Start voice input'}
                disabled={isLoading}
              >
                {isRecording ? (
                  <MicOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            )}

            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isRecording ? "Listening... speak now" : "Ask about Indian laws..."}
                rows={1}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-4 rounded-xl bg-white/10 border text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all ${
                  isRecording ? 'border-red-500/50' : 'border-white/20'
                }`}
                style={{ maxHeight: '120px' }}
                disabled={isLoading}
              />
              {isRecording && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-red-400">Recording</span>
                </div>
              )}
            </div>
            
            <button
              type="submit"
              disabled={(!input.trim() && uploadedFiles.length === 0) || isLoading}
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
    </div>
  );
};

export default ChatInterface;
