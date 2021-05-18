const db = require("../db/db");
const userService = require("../db/userservice");
const Query = {
  ping: () => `Hello, World @ ${new Date().toLocaleTimeString()}`,
  users: () => {
    return userService.listAllUsers();
  },
  user: (_s, { id }) => {
    // here we can be sure that id is not null, as it's defined
    // as a mandatory field in the graphql schema
    return userService.getUser(id);
  },

  projects: () => {
    return db.getAllProjects();
  },

  project: async (_s, { id }) => {
    return db.getProjectById(id);
  },
};

module.exports = Query;
