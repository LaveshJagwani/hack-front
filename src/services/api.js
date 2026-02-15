// Use relative path to leverage Vite proxy in development
const API_BASE_URL = '';

export const searchHackathons = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat_search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch hackathons:", error);
    throw error;
  }
};
