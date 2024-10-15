import express from 'express';
import {
  getPosts,
  getUserPosts,
  getPost,
  addPost,
  deletePost,
} from '../controllers/postController.js';
const router = express.Router();

router.get('/', getPosts);
router.get('/user/:username', getUserPosts);
router.post('/post', getPost);
// router.post('/add', addPost); Add route is handled in index.js
router.delete('/delete', deletePost);

export default router;
