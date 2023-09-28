const knex = require("../database/knex")

class MemorandumsController {

  async create(req, res) {
    const { title, description, tags, links } = req.body
    const { user_id } = req.params

    const [memorandum_id] = await knex("memorandums").insert({
      title,
      description,
      user_id
    }) 

    console.log(`memorandum_id:${memorandum_id}`)

    const linksInsert = links.map(link => {
      return {
        memorandum_id,
        url: link
      }
    })
    console.log(linksInsert)
    await knex("links").insert(linksInsert)

    const tagsInsert = tags.map(name => {
      return {
        memorandum_id,
        name,
        user_id
      }
    })
    await knex("tags").insert(tagsInsert)

    res.json()

  }

  async show(req, res) {
    const { id } = req.params
    const memo = await knex("memorandums").where({id}).first()
    const tags = await knex("tags").where({ memorandum_id: id}).orderBy("name")
    const links = await knex("links").where({memorandum_id: id}).orderBy("created_at")

    return res.json({
      ...memo,
      tags,
      links
    })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex("memorandums").where({id}).delete()

    return res.json()
  }

  async index(req, res) {
    const { title, user_id, tags } = req.query
    
    let memorandums

    if(tags) {

      const filterTags = tags.split(',').map(tag => tag.trim())

      memorandums = await knex("tags")
        .select([
          "memorandums.id",
          "memorandums.title",
          "memorandums.user_id",
        ])
        .where("memorandums.user_id", user_id)
        .whereLike("memorandums.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("memorandums", "memorandums.id", "tags.memorandum_id")
        .orderBy("memorandums.title")

    }else{
      memorandums = await knex("memorandums")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const userTags = await knex("tags").where({ user_id })
    const memorandumsWithTags = memorandums.map(memo => {
      const memoTags = userTags.filter(tag => tag.memorandum_id === memo.id)
      return {
        ...memo,
        tags: memoTags
      }
    })

    res.json({ memorandumsWithTags })
  }


}

module.exports = MemorandumsController