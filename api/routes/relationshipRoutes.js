import express from 'express';
import { updateRelationship } from '../controllers/relationshipController.js';
const router = express.Router();

router.post('/update', updateRelationship);

export default router;
