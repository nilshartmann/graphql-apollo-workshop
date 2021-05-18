const AddTaskResponseResolver = {
  // TODO Implementiere die __resolveType-Funktion
  //    - lies das übergeben Objekt auis
  //    - stelle fest, von welchem Typ das Objekt ist (AddTaskSuccess oder AddTaskResponse)
  //         (Die Prüfung kannst Du sehr rudimentär machen,
  //         in dem Du auf das 'newTask' bzw 'errorCode'-Property prüfst)
  //    - Die Funktion muss den ermittelten Typ-NAmen als String zurückgeben
  //     (oder null, falls Typ nicht bestimmt werden kann)
  //
  // Füge diesen Resolver in der ResolverMap in server.js hinzu:
  //    AddTaskResponse: require("./resolvers/add-task-response")
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
