const { app } = require("./app");
const mongoConnect = require("./db/mongoDb.js");

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await mongoConnect();
  app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
  });
};

startServer();
