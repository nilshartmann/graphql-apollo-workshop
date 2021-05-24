module.exports = {
  client: {
    includes: ["frontend/src/**/*.js"],
    service: {
      name: "project-app",
      url: "http://localhost:4000/graphql",
    },
  },
};
