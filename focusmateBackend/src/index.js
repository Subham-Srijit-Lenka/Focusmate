import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/tasks.route.js";

dotenv.config({ path: "./env" });

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
});

// Middleware to attach io to every request
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Mount routers AFTER req.io middleware
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// Socket.IO connection events
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

connectDB()
    .then(() => {
        server.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
    });
