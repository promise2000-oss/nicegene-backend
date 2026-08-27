import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import router from "./routes/index";
import { setupSwagger } from "./utils/swagger";
const app = express(); // Global Middlewares

app.use(helmet({  crossOriginResourcePolicy: false, // Allows images to be loaded by client applications
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static directory for uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Swagger Documentation
setupSwagger(app);

// API Routes
app.use('/api', router);

// Default Route
app.get('/', (req, res) => {  res.json({ message: 'Welcome to the Nicegene Website API' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {  console.error(err.stack);  res.status(500).json({    message: err.message || 'An unexpected error occurred on the server',  });
});

export default app;
