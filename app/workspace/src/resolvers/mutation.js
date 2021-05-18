const db = require("../domain/db");
const userService = require("../domain/userservice");

function inFourteenDays() {
  const toBeFinishedAt = new Date();
  toBeFinishedAt.setDate(toBeFinishedAt.getDate() + 14);
  return toBeFinishedAt.toISOString();
}

const MutationResolver = {
  async addTask(_s, { projectId, input }) {
    input.toBeFinishedAt = input.toBeFinishedAt || inFourteenDays();

    const user = await userService.getUser(input.assigneeId);
    if (!user) {
      throw new Error(`Unknown assignee with id '${input.assigneeId}'`);
    }

    const newTask = await db.addTaskToProject(projectId, input);

    return newTask;
  },

  async updateTaskState(_s, { taskId, newState }) {
    const updatedTasks = await db.updateTaskState(taskId, newState);

    return updatedTasks;
  },
};

module.exports = MutationResolver;
