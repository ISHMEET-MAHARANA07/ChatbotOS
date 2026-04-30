export interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  created_at: string;
}

export interface StatsEntry {
  date: string;
  user_count: number;
  bot_count: number;
}

const API_BASE_URL = 'http://localhost:8000/api';

export const getMessages = async (): Promise<Message[]> => {
  const response = await fetch(`${API_BASE_URL}/messages/`);
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  return response.json();
};

export const sendMessage = async (text: string): Promise<Message> => {
  const response = await fetch(`${API_BASE_URL}/chat/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
};

export const getStats = async (filter: 'daily' | 'monthly'): Promise<StatsEntry[]> => {
  const response = await fetch(`${API_BASE_URL}/stats/?filter=${filter}`);
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  return response.json();
};
