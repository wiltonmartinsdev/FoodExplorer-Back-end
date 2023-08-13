const up = (knex) =>
	knex.schema.createTable("ingredients", (table) => {
		table.increments("Id");
		table.text("Name").notNullable();
		table
			.integer("DishId")
			.references("Id")
			.inTable("dishes")
			.onDelete("CASCADE");
		table.timestamp("CreatedAt").default(knex.fn.now());
	});

const down = (knex) => knex.schema.dropTable("ingredients");

export { up, down };
