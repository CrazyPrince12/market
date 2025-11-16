// Modern Node 2025: Async handlers, helmet security
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware best practices
app.use(helmet()); // Security headers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/auth/', limiter);

// DB connect async
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Mongo connected – No leaks, reuf! 🔒'))
    .catch(err => console.error('DB fail:', err));

// Routes mount
app.use('/auth', require('./routes/auth'));
app.use('/produits', require('./routes/produits'));
app.use('/chat', require('./routes/chat'));

// Static public
app.use(express.static('public'));

// Socket realtime – 2025 non-blocking
io.on('connection', (socket) => {
    require('./sockets/realtime')(io, socket);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server up on ${PORT} – Drops incoming! 🔥`));