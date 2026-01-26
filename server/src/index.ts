import express from 'express';
import mqtt, { MqttClient } from 'mqtt';
import { createServer } from 'http';
import { Server as WebSocketServer } from 'socket.io';

const app = express();
app.use(express.json());

const port = 3000;

// Topics
const statusTopic = '/status';
const commandTopic = '/mainControl/commands';

// MQTT broker configuration
var brokerUrl: string;
if (process.argv[2] === 'local') {
  console.log('Starting in LOCAL mode');
  brokerUrl = 'mqtt://172.20.10.14:1884'; 
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

const client: MqttClient = mqtt.connect(brokerUrl);

// Wrap Express app with HTTP server
const httpServer = createServer(app);

// Attach Socket.io to the HTTP server
const io = new WebSocketServer(httpServer, {
  cors: { origin: "*" }
});

// Connect to the MQTT broker
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to a status topic
  client.subscribe(statusTopic, (err) => {
    if (!err) {
      console.log('Subscribed to ' + statusTopic);
    } else {
      console.error('Subscription error:', err);
    }
  });
});

client.on('message', (topic: string, payload: Buffer) => {
  const message = JSON.parse(payload.toString());
  
  console.log(`${message.origin}`);

  const event = {
    origin: message.origin,
    device: message.device,
    action: message.action,
    payload: message.payload
  };

  console.log(`Received message on ${topic}: ${payload}`);
  
  // Broadcast the message to all connected WebSocket clients
  io.emit('event', event);
});

app.post('/rgb', (req, res) => {
  const { r, g, b } = req.body;
  
  console.log("Received RGB Message");

  if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
    return res.status(400).send('Invalid RGB values');
  }

  const message = {
    origin: 'ORIGIN_APP',
    device: 'LIGHT',
    action: 'SET',
    payload: {
      r: r, g: g, b: b
    }
  }
  const payload = JSON.stringify(message);

  client.publish(commandTopic, payload, { qos: 1 }, (err) => {
    if (err) {
      res.status(500).json({
        error: 'Failed to publish RGB message'
      });
    } else {
      res.sendStatus(204);
    }
  });
});

// Start the Express server
httpServer.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});