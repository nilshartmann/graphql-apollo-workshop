const fetch = require("node-fetch");

class UserService {
  constructor() {
    this.baseURL = "http://localhost:4010/";
  }

  async listAllUsers() {
    console.log(
      `[UserService::listAllUsers] READING ALL USERS FROM '${this.baseURL}'`
    );

    const response = await fetch(`${this.baseURL}users`);
    const users = await response.json();

    return users;
  }

  async getUser(id) {
    console.log(
      `[UserService::getUser] READING USER WITH ID '${id}' FROM '${this.baseURL}'`
    );
    // this method is invoked each time a user is requested
    // BUT: the actual remote call to the REST service might not be done
    //      due to cache-headers received from a previous call
    //      https://stackoverflow.com/a/53362001/6134498

    const response = await fetch(`${this.baseURL}users/${id}`);
    if (response.status === 404) {
      return null;
    }

    const user = await response.json();
    return user;
  }
}

const userService = new UserService();
module.exports = userService;
