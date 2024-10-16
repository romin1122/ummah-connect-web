import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import { userValidator } from './helpers/userValidator.js';
import { validator } from './helpers/validateMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import relationshipRoutes from './routes/relationshipRoutes.js';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://ummahconnect.xyz/'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users/validate', userValidator);

app.use('/api/users', validator, userRoutes);
app.use('/api/posts', validator, postRoutes);
app.use('/api/comments', validator, commentRoutes);
app.use('/api/likes', validator, likeRoutes);
app.use('/api/relationships', validator, relationshipRoutes);

// Single port app with built react app
// https://abbasimusab2000.medium.com/setting-up-mern-website-on-single-port-for-deployment-4ab4ada8fe4d
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(
  '/static',
  express.static(path.join(__dirname, '..', 'client', 'static'))
);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});
app.use((_, res) => {
  res.send({
    message: 'Not found!',
  });
});

app.listen(process.env.NODE_ENV == 'production' ? 80 : 8000, (err) => {
  if (err) console.error(err);
  console.log(
    'Server started listening on port ' +
      Number(process.env.NODE_ENV == 'production' ? 80 : 8000)
  );
});
