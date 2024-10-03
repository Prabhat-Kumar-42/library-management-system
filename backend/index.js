const { app } = require("./app");
const mongoConnect = require("./db/mongoDb.js");
const { info } = require("./utility/logger.util.js");

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await mongoConnect();
  app.listen(PORT, () => {
    info(`server started at port ${PORT}`);
  });
};

startServer();
