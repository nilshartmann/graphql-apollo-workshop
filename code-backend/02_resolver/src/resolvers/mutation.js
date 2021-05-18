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

  async addTask(_s, { projectId, input }) {
    // TODO ÜBUNG 3 ("CONTEXT"):
    //   füge den Context-Parameter hinzu
    //   lies den currentUser aus
    //   - wenn kein currentUser wirf ein Error ("nur für angemeldete Benutzer erlaubt")
    //   - wenn currentUser.id nicht der assigneeId aus dem input, wirf ebenfalls einen Fehler
    input.toBeFinishedAt = input.toBeFinishedAt || inFourteenDays();

    const user = await userService.getUser(input.assigneeId);
    if (!user) {
      throw new Error(`Unknown assignee with id '${input.assigneeId}'`);
    }

    const newTask = await db.addTaskToProject(projectId, input);

    return newTask;
  },
};

module.exports = MutationResolver;
