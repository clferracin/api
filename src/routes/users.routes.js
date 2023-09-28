const { Router } = require("express")
const UsersController = require("../controllers/UsersController")
const usersRoutes = Router()

function myMiddleware(req, res, next) {
  console.log('Você passou pelo middleware.')
  /*
  if(!req.body.isAdmin) {
    return res.json({message: "user unauthorized!"})
  }
  */
  next() // função domiuddleware que chama o destino
}

const userController = new UsersController()

usersRoutes.post("/", myMiddleware, userController.create)
usersRoutes.put("/:id", myMiddleware, userController.update)

module.exports = usersRoutes