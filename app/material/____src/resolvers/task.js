const TaskResolver = {
  assignee(task, _, { dataSources }) {
    return dataSources.userDataSource.getUser(task._assigneeId);
  },
};

module.exports = TaskResolver;
