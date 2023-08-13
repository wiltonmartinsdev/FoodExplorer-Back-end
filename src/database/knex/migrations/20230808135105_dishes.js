const up = (knex) =>
	knex.schema.createTable("dishes", (table) => {
		table.increments("Id");
		table.text("Name").notNullable();
		table.text("Description");
		table.text("Category");
		table.float("Price");
		table.text("Image");
		table.timestamp("CreatedAt").default(knex.fn.now());
		table.timestamp("UpdatedAt").default(knex.fn.now());
	});

const down = (knex) => knex.schema.dropTable("dishes");

export { up, down };
