const db = require("../domain/db");
const userService = require("../domain/userservice");

const RootQueryResolver = {
  ping() {
    return `Hello, World @ ${new Date().toLocaleTimeString()}`;
  },

  users() {
    return userService.listAllUsers();
  },

  user(_s, { id }) {
    return userService.getUser(id);
  },

  // TODO: --------------------------------------------------------------------------
  // Implementiere den 'projects' und den 'project' resolver
  //
  // HINWEISE:
  //   - Die Signatur der Methoden findest Du auf den Slides
  //
  //   - Die Datenbank steht über das 'db'-Objekt zur Verfügung
  //
  //   - Das db-Objekt ist eine Instanz von 'Database'
  //       - siehe src/domain/db.js
  //       - dort findest Du alle Methoden, die Du für den DB-Zugriff benötigst
  //
  //   - Die Methoden am db-Objekt liefern die Daten bereits in dem
  //     Format, dass an der GraphQL Schnittstelle erwartet wird. Du kannst
  //     sie also einfach zurückgeben, ohne sie verändern/aufbereiten zu müssen
  // ---------------------------------------------------------------------------------
  //
  //  'projects': liefert pauschal ALLE Projekte aus der Datenbank
  //  'project: liefert genau EIN Projekt (oder null) aus der Datenbank. Das gesuchte
  //            Projekt wird dem Resolver mit dem Argument 'id' übergeben
};

module.exports = RootQueryResolver;
