import express from 'express';
import { createJob, getAllJobs } from '../controllers/jobController.js';

const router = express.Router();

router.get('/', getAllJobs);   // GET /api/jobs
router.post('/', createJob);   // POST /api/jobs

export default router;
