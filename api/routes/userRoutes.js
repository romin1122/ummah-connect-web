import express from 'express';
import { getUser, updateUser } from '../controllers/userController.js';
import { multipleFilesUploader } from '../helpers/fileUploader.js';

const router = express.Router();

router.get('/find/:username', getUser);
router.put('/update', multipleFilesUploader, updateUser);

export default router;
