import express from 'express';
import {
  getComments,
  // totalComments,
  addComment,
  deleteComment,
} from '../controllers/commentController.js';
const router = express.Router();

router.get('/', getComments);
// router.get('/total', totalComments);
router.post('/add', addComment);
router.delete('/delete', deleteComment);

export default router;
