const fetch = require("node-fetch");

async function auth(userToken) {
  if (!userToken) {
    return null;
  }

  const response = await fetch(`http://localhost:4010/auth`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ token: userToken }),
  });

  if (response.status === 404) {
    return null;
  }

  const user = await response.json();
  return user;
}

module.exports = auth;
