const up = (knex) =>
	knex.schema.createTable("dishes", (table) => {
		table.increments("ID");
		table.text("Name").notNullable();
		table.text("Description");
		table.text("Category");
		table.float("Price");
		table.text("Image");
		table.timestamp("Created_at").default(knex.fn.now());
		table.timestamp("Updated_at").default(knex.fn.now());
	});

const down = (knex) => knex.schema.dropTable("dishes");

export { up, down };
