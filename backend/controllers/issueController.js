import Issue from '../models/Issue.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errorSubs/index.js';

const createIssue = async (req, res) => {
  const { description, department } = req.body;

  if (!description || !department) {
    throw new BadRequestError('Please provide all values');
  }
  req.body.createdBy = req.user.userId;
  const issue = await Issue.create(req.body);
  res.status(StatusCodes.CREATED).json({ issue });
};
const getAllIssues = async (req, res) => {
  res.send('getAllIssues user');
};
const updateIssue = async (req, res) => {
  res.send('update user');
};
const deleteIssue = async (req, res) => {
  res.send('deleteIssue user');
};
const showStats = async (req, res) => {
  res.send('showStats user');
};
export { createIssue, deleteIssue, getAllIssues, updateIssue, showStats };
