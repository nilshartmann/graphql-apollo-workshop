const db = require("../domain/db");
const userService = require("../domain/userservice");

const RootQueryResolver = {
  ping() {
    return `Hello, World @ ${new Date().toLocaleTimeString()}`;
  },

  async users() {
    const users = await userService.listAllUsers();
    return new Promise((res) => {
      setTimeout(() => res(users), 1);
    });
  },

  user(_s, { id }) {
    return userService.getUser(id);
  },

  projects() {
    return db.getAllProjects();
  },

  project(_s, { id }) {
    return db.getProjectById(id);
  },
};

module.exports = RootQueryResolver;
