import express from 'express';
import {
  // getLikes,
  // getLiked,
  updateLike,
} from '../controllers/likeController.js';
const router = express.Router();

router.post('/update', updateLike);

export default router;
