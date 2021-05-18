const db = require("../domain/db");
const userService = require("../domain/userservice");

const ProjectResolver = {
  owner(project) {
    // 1+n problem for fetching owners 😱
    return userService.getUser(project._ownerId);
  },

  category(project) {
    // 1+n problem for fetching categories 😱
    return db.getCategoryById(project._categoryId);
  },

  tasks(project, _args) {
    return db.getTasks(project.id);
  },

  task(_project, { id }) {
    return db.getTaskById(id);
  },
};

module.exports = ProjectResolver;
