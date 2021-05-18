const userService = require("../domain/userservice");

const TaskResolver = {
  assignee: (task) => {
    return userService.getUser(task._assigneeId);
  },
};

module.exports = TaskResolver;
