const up = (knex) =>
	knex.schema.createTable("favorites", (table) => {
		table.increments("Id");
		table.integer("UserId").references("Id").inTable("users")
		table
			.integer("DishId")
			.references("Id")
			.inTable("dishes")
			.onDelete("CASCADE");
		table.timestamp("CreatedAt").default(knex.fn.now());
	});

const down = (knex) => knex.schema.dropTable("favorites");

export { up, down };
