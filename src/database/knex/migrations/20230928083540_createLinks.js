exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id")
  table.integer("memorandum_id").references("id").inTable("memorandums").onDelete("CASCADE")
  table.text("url").notNullable()
  table.timestamp("created_at").default(knex.fn.now())

})

exports.down = knex => knex.schema.dropTable("links")
