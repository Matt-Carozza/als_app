import { apiFetch } from "./http";

export async function sendRGB(
    r: number, 
    g: number, 
    b: number
): Promise<void> {
    return apiFetch('/rgb', {
        method: 'POST',
        body: JSON.stringify({ r: r, g: g, b: b})
    });
}