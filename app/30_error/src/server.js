const { ApolloServer } = require("apollo-server");
const responseCachePlugin = require("apollo-server-plugin-response-cache");

const auth = require("./domain/auth");

const typeDefs = require("./schema");

const resolvers = {
  Query: require("./resolvers/query"),
  Mutation: require("./resolvers/mutation"),
  Project: require("./resolvers/project"),
  Task: require("./resolvers/task"),
  AddTaskResponse: require("./resolvers/add-task-response"),
};

const server = new ApolloServer({
  typeDefs,

  resolvers,

  context: async ({ req }) => {
    const token = req.headers.token;
    if (token) {
      const user = await auth(token);
      if (user) {
        return { currentUser: user };
      }
    }
  },

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
});

server.listen().then(({ url }) => {
  console.log(`  Server ready at ${url}`);
});
