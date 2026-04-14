import { ServerEvent } from '@shared/events';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

type EventHandler = (event: ServerEvent) => void;
const handlers = new Set<EventHandler>();

export function connectSocket(url: string) {
    if (socket) return socket;
    console.log("Connect socket called");

    // socket = io(url);
    socket = io(url, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
    });
    
    socket.on('connect', () => {
       console.log("Socket connected");
    })
    
    socket.on('event', (event: ServerEvent) => {
        handlers.forEach(handler => handler(event));
    });
    
    socket.on("disconnect", (reason) => {
      console.warn("Disconnected:", reason);
    });
    
    socket.on('connect_error', (err) => {
        console.error("Connect error:", err.message);
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

// export function subscribeAction<A extends ServerEvent['action']>(
//     action: A,
//     handler: (event: Extract<ServerEvent, { action: A }>) => void
// ) {
//     const wrapped: EventHandler = (event) => {
//         if (event.action === action) {
//             handler(event as any);
//         }
//     };

//     handlers.add(wrapped);

//     return () => {
//         handlers.delete(wrapped);
//     };
// }