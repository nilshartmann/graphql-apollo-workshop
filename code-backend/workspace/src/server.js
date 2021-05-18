const { ApolloServer } = require("apollo-server");
const responseCachePlugin = require("apollo-server-plugin-response-cache");

const typeDefs = require("./schema");

const resolvers = {
  Query: require("./resolvers/query"),
  Mutation: require("./resolvers/mutation"),
  Project: require("./resolvers/project"),
  Task: require("./resolvers/task"),
};

const server = new ApolloServer({
  typeDefs,

  resolvers,

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
