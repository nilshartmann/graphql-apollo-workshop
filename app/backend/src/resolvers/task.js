const userService = require("../db/userservice");

module.exports = {
  assignee: (task) => {
    return userService.getUser(task._assigneeId);
  },
};
