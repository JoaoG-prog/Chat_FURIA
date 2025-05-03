import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"]
  }
});

const connectedUsers = new Set();
let matchStatus = {
  score: { FURIA: 0, opponent: 0 },
  map: 'Mirage',
  round: 1,
  phase: 'AO VIVO',
  crowdEnergy: 50,
};

// Bot names for random selection
const botNames = [
  'AnaTorcedora', 'CSLover', 'bruno_97', 'FuriaFan22', 'carolzinha',
  'FuriaNation', 'CSGOMaster', 'ProGamer', 'FuriaForever', 'BrasilCS',
  'FuriaChampion', 'CSLegend', 'FuriaFanatic', 'BrasilGaming', 'FuriaPower'
];

// Bot messages for random selection
const botMessages = [
  'WHAT A SHOT! 🔥',
  'LETS GOOO FURIA! 💪',
  'SO TENSE RIGHT NOW! 😱',
  'COME ON FURIA! 🏆',
  'FURIA IS THE BEST! 🐯',
  'THIS IS INSANE! 🤯',
  'FURIA WILL WIN! 🏅',
  'WHAT A PLAY! 👏',
  'FURIA IS UNSTOPPABLE! ⚡',
  'THIS IS THE BEST TEAM! 🌟',
  'FURIA IS LEGENDARY! 🐐',
  'WHAT A COMEBACK! 🔄',
  'FURIA IS ON FIRE! 🔥',
  'THIS IS HISTORY! 📜',
  'FURIA IS THE GOAT! 🐐',
  'WHAT A MATCH! 🎮',
  'FURIA IS THE CHAMPION! 🏆',
  'THIS IS THE REAL DEAL! 💯',
  'FURIA IS THE KING! 👑',
  'WHAT A PERFORMANCE! 🎯'
];

// Bot reactions to other messages
const botReactions = [
  'TOTALLY AGREE! 👍',
  'THAT WAS AMAZING! 🔥',
  'I CAN\'T BELIEVE IT! 😱',
  'FURIA IS THE BEST! 🏆',
  'THIS IS INSANE! 🤯',
  'FURIA WILL WIN! 💪',
  'WHAT A PLAY! 👏',
  'FURIA IS UNSTOPPABLE! ⚡',
  'THIS IS THE BEST TEAM! 🌟',
  'FURIA IS LEGENDARY! 🐐'
];

// Simulate match updates
const simulateMatchUpdates = () => {
  setInterval(() => {
    // Randomly update match status
    if (Math.random() > 0.7) {
      if (Math.random() > 0.5) {
        matchStatus.score.FURIA += 1;
      } else {
        matchStatus.score.opponent += 1;
      }
    }
    
    matchStatus.round += 1;
    if (matchStatus.round > 30) {
      matchStatus.round = 1;
      matchStatus.phase = matchStatus.phase === 'AO VIVO' ? 'INTERVALO' : 'AO VIVO';
    }

    // Update crowd energy based on recent activity
    matchStatus.crowdEnergy = Math.min(100, matchStatus.crowdEnergy + (Math.random() * 10 - 5));
    
    io.emit('match_update', matchStatus);
  }, 5000); // Update every 5 seconds
};

// Simulate bot activity
const simulateBotActivity = () => {
  setInterval(() => {
    // Random bot message
    if (Math.random() > 0.7) {
      const randomBot = botNames[Math.floor(Math.random() * botNames.length)];
      const randomMessage = botMessages[Math.floor(Math.random() * botMessages.length)];
      
      io.emit('message', {
        text: randomMessage,
        user: randomBot,
        timestamp: new Date().toLocaleTimeString(),
        isBot: true
      });
      
      // Increase crowd energy
      matchStatus.crowdEnergy = Math.min(100, matchStatus.crowdEnergy + 5);
      io.emit('match_update', matchStatus);
    }
  }, 8000); // Every 8 seconds
};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send initial match status
  socket.emit('match_update', matchStatus);

  socket.on('user_joined', (username) => {
    connectedUsers.add(username);
    io.emit('message', {
      text: `${username} joined the chat!`,
      user: 'System',
      timestamp: new Date().toLocaleTimeString()
    });
    
    // Increase crowd energy when a user joins
    matchStatus.crowdEnergy = Math.min(100, matchStatus.crowdEnergy + 10);
    io.emit('match_update', matchStatus);
  });

  socket.on('message', (message) => {
    io.emit('message', message);
    
    // Increase crowd energy when a user sends a message
    matchStatus.crowdEnergy = Math.min(100, matchStatus.crowdEnergy + 2);
    io.emit('match_update', matchStatus);
  });

  socket.on('crowd_chant', (message) => {
    // Increase crowd energy when someone chants
    matchStatus.crowdEnergy = Math.min(100, matchStatus.crowdEnergy + 10);
    
    io.emit('crowd_message', message);
    io.emit('match_update', matchStatus);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start match simulation
simulateMatchUpdates();
simulateBotActivity();

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 