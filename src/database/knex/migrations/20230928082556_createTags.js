exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id")
  table.text("name").notNullable()
  table.integer("memorandum_id").references("id").inTable("memorandums").onDelete("CASCADE")
  table.integer("user_id").references("id").inTable("users")

})

exports.down = knex => knex.schema.dropTable("tags")
