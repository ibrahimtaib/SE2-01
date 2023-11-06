// Separating the server from the app instance
const app = require("./app");
const serv = app.listen(3001, () => {
  console.log(`Listening on port 3001`);
});
