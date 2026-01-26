import { io, Socket } from 'socket.io-client';
import { ServerEvent } from './events';

let socket: Socket | null = null;

type EventHandler = (event: ServerEvent) => void;
const handlers = new Set<EventHandler>();

export function connectSocket(url: string) {
    if (socket) return socket;

    socket = io(url);
    
    socket.on('connect', () => {
       console.log("Socket connected");
    })
    
    socket.on('event', (event: ServerEvent) => {
        handlers.forEach(handler => handler(event));
    });
    
    return socket;
}

export function disconnectSocket() {
    socket?.disconnect();
    socket = null;
}

export function subscribe(handler: EventHandler) {
    handlers.add(handler);
    return () =>  {
        handlers.delete(handler);
    }
}

export function subscribeAction<A extends ServerEvent['action']>(
    action: A,
    handler: (event: Extract<ServerEvent, {action: A}>) => void
){
    return subscribe(event => {
        if (event.action === action) {
            handler(event as any);
        }
    })
}