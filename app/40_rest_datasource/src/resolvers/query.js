const db = require("../domain/db");

const RootQueryResolver = {
  ping() {
    return `Hello, World @ ${new Date().toLocaleTimeString()}`;
  },

  users(_, __, { dataSources }) {
    return dataSources.userDataSource.listAllUsers();
  },

  user(_s, { id }, { dataSources }) {
    return dataSources.userDataSource.getUser(id);
  },

  me(_, __, { currentUser }) {
    return currentUser;
  },

  projects() {
    return db.getAllProjects();
  },

  project(_s, { id }) {
    return db.getProjectById(id);
  },
};

module.exports = RootQueryResolver;
