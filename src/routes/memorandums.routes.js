const { Router } = require("express")
const MemorandumsController = require("../controllers/MemorandumsController")
const memorandumsRoutes = Router()

function myMiddleware(req, res, next) {
  console.log('Você passou pelo middleware do memorandum.')
  /*
  if(!req.body.isAdmin) {
    return res.json({message: "user unauthorized!"})
  }
  */
  next() // função domiuddleware que chama o destino
}

const memorandumsController = new MemorandumsController()

memorandumsRoutes.get("/", myMiddleware, memorandumsController.index)
memorandumsRoutes.post("/:user_id", myMiddleware, memorandumsController.create)
memorandumsRoutes.get("/:id", myMiddleware, memorandumsController.show)
memorandumsRoutes.delete("/:id", myMiddleware, memorandumsController.delete)

module.exports = memorandumsRoutes