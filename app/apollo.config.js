module.exports = {
  client: {
    includes: ["./frontend_workspace/src/**/*.js"],
    service: {
      name: "project-app",
      url: "http://localhost:4000/graphql",
    },
  },
};
