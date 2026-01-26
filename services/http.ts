import { API_BASE_URL } from "@/constants/api";

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
        'Content-Type' : 'application/json',
        ...options.headers,
    },
    ...options
  });
  
  if (res.status === 204) return; // No content, but successful, so return 
  
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  
  return res.json();
}
