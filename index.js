const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
const port = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
