const db = require("../domain/db");
const userService = require("../domain/userservice");

// TODO ----------------------------------------------------------------
//
// Implementiere den 'tasks' und 'task' resolver
//
//   - Als Source erhalten diese Resolver ein Project object
//   - Die benötigten Informationen (tasks bzw ein task) können
//     über die db gelesen werden:
//       getTasks bzw getTaskById(id)
//  - Zur Erinnerung siehe im Schema nach, wie task bzw tasks
//    Feld auf dem Project Type definiert sind
//

const ProjectResolver = {
  owner(project) {
    return userService.getUser(project._ownerId);
  },

  category(project) {
    return db.getCategoryById(project._categoryId);
  },

  tasks() {
    // Implementiere den 'tasks' resolver, der alle Tasks
    //   des Projektes zurückliefert
    // Ruf dazu die entsprechende Methode an der db auf
    //   - Welchen Parameter musst Du der Methode übergeben?
  },

  task() {
    // Implementiere den 'task' resolver, der einen spezifischen
    //   Task an Hand seiner Id zurückliefert
    //
    // Ruf dazu die entsprechende Methode an der db auf
    //   - Welchen Parameter musst Du der Methode übergeben?
  },
};

module.exports = ProjectResolver;
