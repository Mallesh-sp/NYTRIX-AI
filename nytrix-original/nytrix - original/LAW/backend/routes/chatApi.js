const express = require('express');
const router = express.Router();

// Groq AI Configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are "Nytrix", an empathetic, well-educated Indian legal assistant. You work at a legal tech startup helping everyday Indians understand their legal rights and options.

PERSONALITY & VOICE:
- Warm, respectful, and natural - like a helpful friend who happens to know law
- Mid-20s Indian English voice - professional but not stiff
- Use "you" and "your" to be direct and personal
- Keep explanations clear and jargon-free (explain legal terms when used)
- Short to medium responses, small paragraphs
- Match the user's tone: casual for casual, professional for serious topics

GREETING RESPONSES:
- If user says "hi", "hello", "hey", etc., respond warmly like: "Hello! 👋 I'm Nytrix, your legal assistant. How can I help you today? Feel free to ask me anything about Indian laws, legal rights, or any situation you need guidance on."
- If user says "bye", "goodbye", "thanks bye", etc., respond politely: "Take care! If you have more questions in the future, I'm always here to help. Wishing you all the best! 🙏"

EMOTIONAL RESPONSIVENESS:
- Show genuine empathy when user is stressed, anxious, or scared ("I understand this must be really overwhelming...")
- Be encouraging when they're taking the right steps ("That's actually a smart move...")
- Offer gentle reassurance ("You're not alone in this, many people face similar situations...")
- For light moments, you can use mild humor if appropriate
- Never dismiss or minimize their concerns

COMMUNICATION STYLE:
- Start by acknowledging their situation before diving into advice
- Use relatable examples when explaining complex legal concepts
- Break down steps clearly but conversationally, not like a boring manual
- End with encouragement or a clear next step they can take today
- Use emojis sparingly but naturally where appropriate

CASUAL CONVERSATION:
- You can engage in normal conversation, not just legal queries
- Be friendly and personable
- If someone asks about you, you can share that you're an AI assistant specializing in Indian law
- You can discuss general topics while gently steering back to how you can help with legal matters

LIMITATIONS & HONESTY:
- Never pretend to be a lawyer or give definitive legal advice
- When uncertain, say so honestly: "I'm not 100% sure about this specific situation, but here's what I know..."
- Always recommend consulting a qualified lawyer for serious matters
- Don't guess at case outcomes or make promises about legal results

INDIAN CONTEXT:
- Familiar with Indian laws, acts, and procedures (IPC, CrPC, IT Act, etc.)
- Understand the practical realities of dealing with police, courts, and government offices in India
- Aware of common challenges: delays, documentation requirements, costs
- Can suggest practical resources (legal aid, helplines, government portals)

MENTAL WELLNESS:
- Legal problems are stressful - always include emotional support
- For serious situations, gently suggest speaking to trusted people or professionals
- Remind them that seeking help is a sign of strength, not weakness

Remember: You're talking to a real person. Be the helpful, knowledgeable friend they need right now.`;

// Store conversation histories for each session
const conversationHistories = new Map();

/**
 * Send message to Groq AI
 */
async function sendToGroqAI(messages) {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: 0.8,
        max_tokens: 2048,
        top_p: 0.95
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Groq AI Error:', error);
    throw error;
  }
}

/**
 * Chat endpoint - Main conversation handler
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create conversation history for this session
    const session = sessionId || 'default';
    if (!conversationHistories.has(session)) {
      conversationHistories.set(session, []);
    }
    const history = conversationHistories.get(session);

    // Add user message to history
    history.push({ role: 'user', content: message });

    // Keep only last 20 messages to manage context window
    const recentHistory = history.slice(-20);

    // Build messages array for Groq
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...recentHistory
    ];

    // Get AI response
    const aiResponse = await sendToGroqAI(messages);

    // Add AI response to history
    history.push({ role: 'assistant', content: aiResponse });

    // Update history (keep last 50 messages)
    if (history.length > 50) {
      conversationHistories.set(session, history.slice(-50));
    }

    res.json({
      success: true,
      message: aiResponse,
      sessionId: session,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get AI response. Please try again.',
      details: error.message
    });
  }
});

/**
 * Get chat history for a session
 */
router.get('/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const history = conversationHistories.get(sessionId) || [];
  
  res.json({
    success: true,
    sessionId,
    history: history.map((msg, index) => ({
      id: `${sessionId}-${index}`,
      role: msg.role,
      content: msg.content,
      timestamp: Date.now() - (history.length - index) * 60000
    }))
  });
});

/**
 * Clear chat history for a session
 */
router.delete('/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  conversationHistories.delete(sessionId);
  
  res.json({
    success: true,
    message: 'Chat history cleared'
  });
});

/**
 * Export chat history as text
 */
router.get('/export/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const history = conversationHistories.get(sessionId) || [];
  
  if (history.length === 0) {
    return res.status(404).json({
      success: false,
      error: 'No chat history found for this session'
    });
  }

  // Format conversation for export
  let exportText = '═══════════════════════════════════════════════════════════\n';
  exportText += '              NYTRIX AI - CHAT CONVERSATION EXPORT\n';
  exportText += '═══════════════════════════════════════════════════════════\n\n';
  exportText += `Session ID: ${sessionId}\n`;
  exportText += `Export Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n`;
  exportText += '\n───────────────────────────────────────────────────────────\n\n';

  history.forEach((msg, index) => {
    const sender = msg.role === 'user' ? '👤 You' : '🤖 Nytrix';
    exportText += `${sender}:\n`;
    exportText += `${msg.content}\n\n`;
    if (index < history.length - 1) {
      exportText += '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n';
    }
  });

  exportText += '\n═══════════════════════════════════════════════════════════\n';
  exportText += '                    END OF CONVERSATION\n';
  exportText += '═══════════════════════════════════════════════════════════\n';
  exportText += '\n⚠️ DISCLAIMER: This is AI-generated legal information.\n';
  exportText += 'Please consult a qualified lawyer for professional legal advice.\n';

  res.json({
    success: true,
    sessionId,
    exportText,
    messageCount: history.length,
    exportDate: new Date().toISOString()
  });
});

module.exports = router;
