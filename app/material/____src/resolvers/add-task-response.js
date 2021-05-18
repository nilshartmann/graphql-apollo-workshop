const AddTaskResponseResolver = {
  __resolveType(obj) {
    if ("newTask" in obj) {
      return "AddTaskSuccess";
    }
    if ("code" in obj) {
      return "AddTaskFailure";
    }

    return null;
  },
};

module.exports = AddTaskResponseResolver;
