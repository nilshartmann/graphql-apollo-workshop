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

  async tasks(project, _args) {
    const tasks = await db.getTasks(project.id);

    return new Promise((res) => {
      setTimeout(() => res(tasks), 1000);
    });
  },

  task(_project, { id }) {
    return db.getTaskById(id);
  },
};

module.exports = ProjectResolver;
