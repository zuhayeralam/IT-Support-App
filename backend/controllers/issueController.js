import Issue from '../models/Issue.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errorSubs/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';

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
  const { search, status, issueType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status !== 'all') {
    queryObject.status = status;
  }
  if (issueType !== 'all') {
    queryObject.issueType = issueType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
  // NO AWAIT
  let result = Issue.find(queryObject);

  // chain sort conditions
  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }
  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const issues = await result;

  const totalIssues = await Issue.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalIssues / limit);

  res.status(StatusCodes.OK).json({ issues, totalIssues, numOfPages });
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
  const { id: issueId } = req.params;

  const issue = await Issue.findOne({ _id: issueId });

  if (!issue) {
    throw new CustomError.NotFoundError(`No issue with id : ${issueId}`);
  }

  checkPermissions(req.user, issue.createdBy);

  await issue.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Issue removed' });
};

const showStats = async (req, res) => {
  let stats = await Issue.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    processing: stats.processing || 0,
    declined: stats.declined || 0,
  };

  let monthlyIssues = await Issue.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyIssues = monthlyIssues
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyIssues });
};
export { createIssue, deleteIssue, getAllIssues, updateIssue, showStats };
