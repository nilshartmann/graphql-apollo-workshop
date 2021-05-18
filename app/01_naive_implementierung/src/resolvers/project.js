const db = require("../domain/db");
const userService = require("../domain/userservice");

const ProjectResolver = {
  owner: (project) => {
    // 1+n Problem when the query asks for more than one project 😱
    //     (more or less solved thx to the fact, that the userDataSource caches)
    return userService.getUser(project._ownerId);
  },

  category: async (project) => {
    // 1+n problem for fetching categories 😱
    return db.getCategoryById(project._categoryId);
  },

  tasks: async (project, _args, { dataSources }) => {
    return db.getTasks(project.id);
  },

  task: async (project, { id }, { dataSources }) => {
    // too many requests to database when tasks and task is included in a query and both contain
    // the same task 😱
    if (project.task && project.task.id === id) {
      return project.task;
    }
    return db.getTaskById(id);
  },
};

module.exports = ProjectResolver;
