const db = require("../domain/db");
const userService = require("../domain/userservice");

function inFourteenDays() {
  const toBeFinishedAt = new Date();
  toBeFinishedAt.setDate(toBeFinishedAt.getDate() + 14);
  return toBeFinishedAt.toISOString();
}

const MutationResolver = {
  // TODO ÜBUNG 2 ("RESOLVER"): füge den updateTaskState-Mutation-Resolver hinzu
  //   - Lies die übergebenen Argumente (taskId und newState)
  //   - Du kannst db.updateTaskState verwenden, um den Task zu speichern
  //     - Die Methode liefert den gespeicherten Task zurück, den
  //       Du so unverändert aus deinem Resolver zurückgeben kannst
  async updateTaskState(_s, { taskId, newState }) {
    const updatedTasks = await db.updateTaskState(taskId, newState);

    return updatedTasks;
  },
  // ----- UEBUNG 3: -----------------------------
  async addTask(_s, { projectId, input }, { currentUser }) {
    input.toBeFinishedAt = input.toBeFinishedAt || inFourteenDays();

    const user = await userService.getUser(input.assigneeId);
    if (!user) {
      return {
        code: "1",
        errorMessage: `Unknown assignee with id '${input.assigneeId}'`,
      };
    }

    if (!currentUser) {
      return {
        code: "2",
        errorMessage: "No current user!",
      };
    }

    if (currentUser.id !== input.assigneeId) {
      return {
        code: "3",
        errorMessage: `You (${currentUser.id}) can only assign tasks to yourself, but not to user '${input.assigneeId}'`,
      };
    }

    const newTask = await db.addTaskToProject(projectId, input);

    return { newTask };
  },
};

module.exports = MutationResolver;
