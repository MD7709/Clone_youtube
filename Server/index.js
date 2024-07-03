import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.use('/user', userRoutes);

const PORT = process.env.PORT || 4000;
const DB_URL = process.env.CONNECTION_URL;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongoose database connected");

        const server = http.createServer(app);
        const io = new Server(server, {
            cors: {
                origin: "http://localhost:5173", // Allow this origin
                methods: ["GET", "POST"],
                allowedHeaders: ["Content-Type"],
                credentials: true
            }
        });

        io.on('connection', (socket) => {
            console.log('New user connected:', socket.id);

            socket.on('offer', (data) => {
                console.log('Received offer from', socket.id, 'to', data.target);
                socket.broadcast.emit('offer', data);
            });

            socket.on('answer', (data) => {
                console.log('Received answer from', socket.id, 'to', data.target);
                socket.broadcast.emit('answer', data);
            });

            socket.on('ice-candidate', (data) => {
                console.log('Received ice-candidate from', socket.id, 'to', data.target);
                socket.broadcast.emit('ice-candidate', data);
            });

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });
        });

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database", error);
    });