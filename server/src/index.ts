import { Actions } from '@shared/api';
import { ApiCommand } from '@shared/api/types/base';
import { ServerEvent } from '@shared/events';
import express from 'express';
import { createServer } from 'http';
import mqtt, { MqttClient } from 'mqtt';
import { Server as WebSocketServer } from 'socket.io';
import { sendCommand } from './commandBus';
import { handleSetRGB } from './handlers/light';
import { handleWakeAndSleep } from './handlers/main';
import { handleOffDelay } from './handlers/occ_sensor';
import { validateSetRGB, validateToggleAdaptiveLightingMode } from './validation/light';
import { validateSetOffDelay } from './validation/occ_sensor';

const app = express();
app.use(express.json());

const port = 3000;

// Topics
const status_topic = '/als/status';
const state_update_topic = '/als/app/state';
const web_app_topic = '/als/camera';

// MQTT broker configuration
var brokerUrl: string;
if (process.argv[2] === 'local') {
  console.log('Starting in LOCAL mode');
  brokerUrl = 'mqtt://192.168.8.100:1884'; 
} else if (process.argv[2] === 'public') {
  console.log('Starting in PUBLIC mode');
  brokerUrl = 'mqtt://test.mosquitto.org:1883'; 
} else if (process.argv[2] === undefined) {
  console.log('Starting in DEFAULT mode (LOCAL)');
  brokerUrl = 'mqtt://172.20.10.14:1884'; 
} else {
  console.log('Unknown mode. Use "local" or "public".');
  process.exit(1);
}
brokerUrl = 'mqtt://192.168.8.100:1884'; 

const client: MqttClient = mqtt.connect(brokerUrl);

// Wrap Express app with HTTP server
const httpServer = createServer(app);

// Attach Socket.io to the HTTP server
const io = new WebSocketServer(httpServer, {
  cors: { origin: "*" }
});

const commandHandlers: Record<
  typeof Actions[keyof typeof Actions],
  (payload: any, target?: string) => Promise<void>
> = {
  SET_RGB: handleSetRGB,
  TOGGLE_ADAPTIVE_LIGHTING_MODE: handleWakeAndSleep,
  OCC_CONFIG_DELAY: handleOffDelay,
  GET_MAIN_STATE: function (payload: any, target?: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  SEND_FRAME: function (payload: any, target?: string): Promise<void> {
    throw new Error('Function not implemented.');
  }
};

// Connect to the MQTT broker
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to a status topic
  client.subscribe(status_topic, (err) => {
    if (!err) {
      console.log('Subscribed to ' + status_topic);
    } else {
      console.error('Subscription error:', err);
    }
  });
  client.subscribe(state_update_topic, (err) => {
    if (!err) {
      console.log('Subscribed to ' + state_update_topic);
    } else {
      console.error('Subscription error:', err);
    }
  });
  client.subscribe(web_app_topic, (err) => {
    if (!err) {
      console.log('Subscribed to ' + web_app_topic);
    } else {
      console.error('Subscription error:', err);
    }
  });
});

client.on('message', (topic: string, payload: Buffer) => {
  const raw = payload.toString();
  let message;
  try {
    message = JSON.parse(raw);
  } catch {
    console.warn(`Non-JSON message received on ${topic}: ${raw}`);
    return;
  }
  
  const event: ServerEvent = {
    origin:  message.origin,
    device:  message.device,
    action:  message.action,
    payload: message.payload
  }

  if (topic != web_app_topic) {
    console.log(`Received message on ${topic}: ${payload}`);
  }
  
  // Broadcast the message to all connected WebSocket clients
  io.emit('event', event);
});

app.post('/command', async (req, res) => {
  try {
    const { action, payload, target } = 
    req.body as ApiCommand<keyof typeof commandHandlers, unknown>;
    
    if (!target) {
      return res.status(400).json({
        error: 'Target is required. Use "all" for broadcast.'
      });
    }
    

    const handler = commandHandlers[action];
    if (!handler) {
      return res.status(400).json({ error: 'Unknown action'});
    }
    console.log(`[COMMAND]: ${action}`);
    
    switch(action as typeof Actions[keyof typeof Actions]) {
      case Actions.SET_RGB:
        if (!validateSetRGB(payload))
          return res.status(400).json({ error: 'Invalid RGB payload'});
        break;
      case Actions.TOGGLE_ADAPTIVE_LIGHTING_MODE:
        if (!validateToggleAdaptiveLightingMode(payload))
          return res.status(400).json({ error: 'Invalid HHMM payload'});
        break;
      case Actions.OCC_CONFIG_DELAY:
        if (!validateSetOffDelay(payload))
          return res.status(400).json({ error: 'Invalid off delay payload'});
        break;
    }
    
    await handler(payload, target);
    res.sendStatus(204);

  } catch (err) {
    console.error('Command failed', err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
});

export async function publish(topic: string, msg: ServerEvent) {
  await client.publish(topic, JSON.stringify(msg));
}

// Start the Express server
httpServer.listen(port, "127.0.0.1", () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
// httpServer.listen(port, "0.0.0.0", () => {
//   console.log(`Express server listening at http://localhost:${port}`);
// });

io.on('connection', async (socket) => {
  console.log("Client Connected");
  const brokerMessage: ServerEvent = {
    origin: 'APP',
    device: 'APP',
    action: Actions.GET_MAIN_STATE,
    payload: {}
  };

  await sendCommand(brokerMessage, 
    state_update_topic ?? 'all')
});