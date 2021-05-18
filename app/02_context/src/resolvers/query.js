const db = require("../domain/db");
const userService = require("../domain/userservice");

const RootQueryResolver = {
  ping: () => `Hello, World @ ${new Date().toLocaleTimeString()}`,

  users: () => {
    return userService.listAllUsers();
  },

  user: (_s, { id }) => {
    return userService.getUser(id);
  },

  projects: () => {
    return db.getAllProjects();
  },

  project: async (_s, { id }) => {
    return db.getProjectById(id);
  },
};

module.exports = RootQueryResolver;
