import express from 'express';
const router = express.Router();

import {
  createIssue,
  deleteIssue,
  getAllIssues,
  updateIssue,
  showStats,
} from '../controllers/issueController.js';

router.route('/').post(createIssue).get(getAllIssues);
// remember about :id
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteIssue).patch(updateIssue);

export default router;
