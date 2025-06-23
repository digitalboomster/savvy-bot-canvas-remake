
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-app.vercel.app/api' 
  : '/api';

// Conversations API
export const conversationsAPI = {
  async getAll() {
    const response = await fetch(`${API_BASE}/conversations`);
    if (!response.ok) throw new Error('Failed to fetch conversations');
    return response.json();
  },

  async create(conversation: { title: string; preview: string }) {
    const response = await fetch(`${API_BASE}/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(conversation)
    });
    if (!response.ok) throw new Error('Failed to create conversation');
    return response.json();
  },

  async delete(id: string) {
    const response = await fetch(`${API_BASE}/conversations/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete conversation');
    return response.json();
  }
};

// Messages API
export const messagesAPI = {
  async getForConversation(conversationId: string) {
    const response = await fetch(`${API_BASE}/conversations/${conversationId}/messages`);
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  async create(conversationId: string, message: { text: string; isUser: boolean }) {
    const response = await fetch(`${API_BASE}/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    if (!response.ok) throw new Error('Failed to create message');
    return response.json();
  }
};
