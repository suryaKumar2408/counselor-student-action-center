import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/student.routes';
import taskRoutes from './routes/task.routes';
import { errorHandler } from './middlewares/error.middleware';
import { requestIdMiddleware } from './middlewares/requestId.middleware';
import { requestLogger } from './middlewares/requestLogger.middleware';
import { NotFoundError } from './utils/errors';

// Load environment variables
dotenv.config();

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware);
app.use(requestLogger);

// Routes
app.use('/students', studentRoutes);
app.use('/tasks', taskRoutes);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Path not found: ${req.originalUrl}`));
});

// Global Error Handler
app.use(errorHandler);

export default app;
