function inFourteenDays() {
  const toBeFinishedAt = new Date();
  toBeFinishedAt.setDate(toBeFinishedAt.getDate() + 14);
  return toBeFinishedAt.toISOString();
}

module.exports = {
  addTask: async (_s, { projectId, input }, { dataSources, userId }) => {
    input.toBeFinishedAt = input.toBeFinishedAt || inFourteenDays();

    // Make sure specified user exists in userservice

    const user = await dataSources.userDataSource.getUser(input.assigneeId);
    if (!user) {
      throw new Error(`Unknown assignee with id '${input.assigneeId}'`);
    }

    const newTask = await dataSources.projectDatasource.addTaskToProject(
      projectId,
      input
    );

    return newTask;
  },

  updateTaskState: async (
    _s,
    { taskId, newState },
    { dataSources, pubsub }
  ) => {
    const updatedTasks = await dataSources.projectDatasource.updateTaskState(
      taskId,
      newState
    );

    return updatedTasks;
  },
};
