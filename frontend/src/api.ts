import { API_BASE_URL } from './config';

export interface TemplateResponse {
  prompts: string[];
  uiPrompts: string[];
}

export interface ChatResponse {
  response: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Helper to handle API errors
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = {
      message: `API error: ${response.statusText}`,
      status: response.status,
    };
    try {
      const data = await response.json();
      if (data.message) {
        error.message = data.message;
      }
    } catch {
      // If JSON parsing fails, use default error message
    }
    throw error;
  }
  return response.json();
}

// Call /template endpoint to get initial project setup
export async function postTemplate(prompt: string): Promise<TemplateResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/template`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    return handleResponse<TemplateResponse>(response);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw {
        message: 'Failed to connect to backend. Make sure the server is running on port 3000.',
        status: 0,
      } as ApiError;
    }
    throw error;
  }
}

// Call /chat endpoint to send messages and get AI response
export async function postChat(messages: Array<{ role: 'user' | 'assistant'; content: string }>): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });
    return handleResponse<ChatResponse>(response);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw {
        message: 'Failed to connect to backend. Make sure the server is running on port 3000.',
        status: 0,
      } as ApiError;
    }
    throw error;
  }
}

