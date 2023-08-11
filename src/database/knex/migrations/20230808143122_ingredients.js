const up = (knex) =>
	knex.schema.createTable("ingredients", (table) => {
		table.increments("ID");
		table.text("Name").notNullable();
		table
			.integer("Dish_ID")
			.references("ID")
			.inTable("dishes")
			.onDelete("CASCADE");
		table.timestamp("Created_at").default(knex.fn.now());
	});

const down = (knex) => knex.schema.dropTable("ingredients");

export { up, down };
