const { Router } = require("express");
const usersRouter =  require("./users.routes");
const memorandumsRouter =  require("./memorandums.routes");
const tagsRouter =  require("./tags.routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/memorandums", memorandumsRouter);
routes.use("/tags", tagsRouter);

module.exports = routes;