import express from 'express';
// import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import todoRoute from './routes/todoRoute.js';
import path from 'path';
const app = express();
const PORT = process.env.PORT || 5000;
// app.use(cors());
app.use(express.json());
dotenv.config();

app.use('/api/v1/todo', todoRoute);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
