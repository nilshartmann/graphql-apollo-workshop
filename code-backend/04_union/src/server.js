const { ApolloServer } = require("apollo-server");
const responseCachePlugin = require("apollo-server-plugin-response-cache");

const auth = require("./domain/auth");

const typeDefs = require("./schema");

const resolvers = {
  Query: require("./resolvers/query"),
  Mutation: require("./resolvers/mutation"),

  // TODO "ÜBUNG RESOLVER":
  //       Projekt- Resolver hinzufügen,
  //       wenn Du den Resolver implementiert hast
  Project: require("./resolvers/project"),
  Task: require("./resolvers/task"),

  // ÜBUNG UNION TYPES
  AddTaskResponse: require("./resolvers/add-task-response"),
};

async function buildContext({ req }) {
  // TODO "ÜBUNG CONTEXT"
  //  - Lies den req-Parameter aus,
  //  - Lies den Token aus den HTTP Headern (req.headers.token)
  //  - Falls ein Token gefunden vorhanden sit, übergib den Token
  //    der auth-Funktion, die ein Promise mit einem User (oder null)
  //    zurückgibt
  //  - setz den user als 'currentUser' in das Context-Objekt und
  //  - liefer den Kontext zurück
  const token = req.headers.token;
  if (token) {
    const user = await auth(token);
    if (user) {
      return { currentUser: user };
    }
  }
}

const server = new ApolloServer({
  typeDefs,

  resolvers,

  context: buildContext,

  formatError: (err) => {
    console.error(err.originalError || err);
    return err;
  },

  plugins: [responseCachePlugin()],

  playground: {
    // Playground runs at http://localhost:4000
    settings: {
      "editor.theme": "light",
      "schema.polling.enable": false,
    },
  },
  // tracing: true,
});

server.listen().then(({ url }) => {
  console.log(`  Server ready at ${url}`);
});
