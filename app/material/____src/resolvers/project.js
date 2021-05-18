const db = require("../domain/db");

const ProjectResolver = {
  owner(project, _, { dataSources }) {
    // 1+n problem for fetching owners 😱
    return dataSources.userDataSource.getUser(project._ownerId);
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
