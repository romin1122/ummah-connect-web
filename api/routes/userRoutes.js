import express from 'express';
import { getSelf, getUser, updateUser } from '../controllers/userController.js';
import { multipleFilesUploader } from '../helpers/fileUploader.js';

const router = express.Router();

router.get('/self', getSelf);
router.get('/find/:username', getUser);
router.put('/update', multipleFilesUploader, updateUser);

export default router;
