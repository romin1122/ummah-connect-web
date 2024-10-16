import express from 'express';
import {
  getPosts,
  getUserPosts,
  getPost,
  addPost,
  deletePost,
} from '../controllers/postController.js';
import { singleFileUploader } from '../helpers/fileUploader.js';
const router = express.Router();

router.get('/', getPosts);
router.get('/user/:username', getUserPosts);
router.post('/post', getPost);
router.post('/add', singleFileUploader('file'), addPost);
router.delete('/delete', deletePost);

export default router;
