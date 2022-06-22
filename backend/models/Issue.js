import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: [true, 'Please provide department'],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['processing', 'declined', 'pending'],
      default: 'pending',
    },
    issueType: {
      type: String,
      enum: ['hardware', 'external-device', 'software', 'configuration'],
      default: 'hardware',
    },
    issueLocation: {
      type: String,
      default: 'my city',
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Issue', IssueSchema);
