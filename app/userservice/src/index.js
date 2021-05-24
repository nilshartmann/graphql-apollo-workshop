const express = require("express");
const cors = require("cors");

const port = process.env.SERVER_PORT || 4010;
const users = require("./users");

const app = express();

app.use(cors());
app.use(express.json());

// TODO: Set useCaching to true to add Cache-Control HTTP Headers that allows apollo to cache requests
//       (only for /users/userId route)
const useCaching = false;

// for debugging
let usersRequestCounter = 0;
let usersByIdCounter = 0;

app.get("/users", (_, res) => {
  ++usersRequestCounter;
  console.log(`READING ALL USERS (REQUEST-ID: ${usersRequestCounter})`);

  // no caching here
  res.json(
    users.map((u) => ({ ...u, requestId: `users_${usersRequestCounter}` }))
  );
});

app.get("/users/:userId", (req, res) => {
  ++usersByIdCounter;
  console.log(
    `READING USER WITH ID '${req.params.userId}' (REQUEST-ID: ${usersByIdCounter})`
  );

  const user = users.find((u) => u.id === req.params.userId);
  if (!user) {
    return res
      .status(404)
      .json({ error: `User with id '${req.params.userId}' not found` });
  }

  if (useCaching) {
    res.set("Cache-Control", "public, max-age=10, s-maxage=10");
  }
  return res.json({ ...user, requestId: `usersById_${usersByIdCounter}` });
});

app.post("/auth", (req, res) => {
  // interpret token as userid
  const token = req.body.token;
  console.log(`Checking auth token '${token}'`);
  const user = users.find((u) => u.id.toLowerCase() === token.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: `Invalid token '${token}'` });
  }

  return res.json(user);
});

app.post("/users", (req, res) => {
  const { name, login } = req.body;
  const id = `U${users.length + 1}`;

  const newUser = {
    name,
    login,
    id,
  };

  users.push(newUser);
  ++usersRequestCounter;
  const result = { ...newUser, requestId: usersRequestCounter };

  return res.json(result);
});

app.listen(port, () => {
  console.log(`  📞    User API Server listening on port ${port}`);
  if (useCaching) {
    console.log(
      `  ✅    Adds Cache-Control-Header to response of /users/:userId`
    );
  } else {
    console.log(`  ❌    Does not send Cache-Control-Header`);
  }
});
