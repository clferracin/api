const { Router } = require("express")
const TagsController = require("../controllers/TagsController")
const tagsRoutes = Router()

function myMiddleware(req, res, next) {
  console.log('Você passou pelo middleware das tags.')
  /*
  if(!req.body.isAdmin) {
    return res.json({message: "user unauthorized!"})
  }
  */
  next() // função domiuddleware que chama o destino
}

const tagsController = new TagsController()

tagsRoutes.get("/:user_id", myMiddleware, tagsController.index)

module.exports = tagsRoutes