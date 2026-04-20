import { Actions } from '@shared/api';
import { connectSocket, subscribeAction } from '@shared/services';
import React, { useEffect, useRef, useState } from 'react';


const SquareGrid: React.FC = () => {
  const API_BASE_URL="http://192.168.8.100:3000";
  const BINS: number = 3;
  
  const [occupiedStates, setOccupiedStates] = useState<number[]>(Array(64).fill(0));

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)', 
    gap: '4px',
    width: '100%',
    maxWidth: '750px', 
    aspectRatio: '1 / 1', 
    margin: '20px auto',
  };

  const squareStyle = (pixel: number): React.CSSProperties => {
    const colors: Record<number, string> = {
      0: 'transparent',
      1: 'var(--translucent)',
      2: 'var(--opaque)'
    }
    return {
      width: '100%',
      height: '100%',
      border: '1px solid var(--accent)', 
      backgroundColor: (pixel == 0) ? 'transparent' : 'var(--accent)',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease', 
      opacity: (pixel == 1) ? 0.67 : 1,
    };
  };
  
  const last_update = useRef(0);

  useEffect(() => {
    connectSocket(API_BASE_URL);
    const unsubscribe = subscribeAction('SEND_FRAME', event => {
      if (event.action == Actions.SEND_FRAME) {
        const pixels = event.payload.pixels;
        const now = Date.now();

        if (now - last_update.current > 100) {
          if (Array.isArray(pixels) && pixels.length === 64) {
            setOccupiedStates(pixels);
          } else {
            console.warn("Invalid pixel data", pixels);
          }
        }
      }
    });
    return unsubscribe;
  }, []);
  
  return (
    <div style={containerStyle}>
      {occupiedStates.map((isOccupied, i) => (
        <div 
          key={i} 
          onClick={() => setOccupiedStates(prev => {
            const next = [...prev];
            next[i] = (next[i] + 1) % BINS;
            return next;
          })}
          style={squareStyle(isOccupied)} 
        />
      ))}
    </div>
  );
};

export default SquareGrid;