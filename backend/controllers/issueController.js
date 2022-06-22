import Issue from '../models/Issue.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errorSubs/index.js';
import checkPermissions from '../utils/checkPermissions.js';

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
  const issues = await Issue.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ issues, totalIssues: issues.length, numOfPages: 1 });
};

const updateIssue = async (req, res) => {
  const { id: issueId } = req.params;
  const { department, description } = req.body;

  if (!description || !department) {
    throw new BadRequestError('Please provide all values');
  }
  const issue = await Issue.findOne({ _id: issueId });

  if (!issue) {
    throw new NotFoundError(`No issue with id :${issueId}`);
  }
  // check permissions

  checkPermissions(req.user, issue.createdBy);

  const updatedIssue = await Issue.findOneAndUpdate(
    { _id: issueId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedIssue });
};

const deleteIssue = async (req, res) => {
  res.send('deleteIssue user');
};
const showStats = async (req, res) => {
  res.send('showStats user');
};
export { createIssue, deleteIssue, getAllIssues, updateIssue, showStats };
