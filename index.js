import { runServer } from "./lib/server.js";

runServer({}, err => {
  if (err) {
    throw err;
  }
});
