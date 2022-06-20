const createIssue = async (req, res) => {
  res.send('createIssue user');
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
