import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import relationshipRoutes from './routes/relationshipRoutes.js';
import jwt from 'jsonwebtoken';
import path from 'path';
import multer from 'multer';
import { addPost } from './controllers/postController.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/static/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://ummahconnect.xyz/'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users/validate', (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(200).json(false);

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, userInfo) => {
    if (err) return res.status(200).json(false);
    else {
      res.status(200).json(true);
    }
  });
});

const validator = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not logged in!');

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, userInfo) => {
    if (err)
      return res
        .clearCookie('accessToken', {
          secure: true,
          sameSite: 'none',
        })
        .status(403);
    //handle invalid and what to do. Re login or whatnot
    else {
      req.user = { id: userInfo.id };
    }
  });

  next();
};

app.use('/api/users', validator, userRoutes);
app.use('/api/posts', validator, postRoutes);
app.use('/api/comments', validator, commentRoutes);
app.use('/api/likes', validator, likeRoutes);
app.use('/api/relationships', validator, relationshipRoutes);

app.use('/api/posts/add', validator, upload.single('file'), (req, res) => {
  const file = req.file;

  console.log(file);
  if (file != undefined) req.uploadedImg = file.filename;

  addPost(req, res);
});

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
