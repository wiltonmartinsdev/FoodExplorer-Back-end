const up = (knex) =>
	knex.schema.createTable("users", (table) => {
		table.increments("id");
		table.text("name").notNullable();
		table.text("email");
		table.text("password");
		table.boolean("adminUser").defaultTo(false);
		table.timestamp("created_at").default(knex.fn.now());
		table.timestamp("updated_at").default(knex.fn.now());
	});

const down = (knex) => knex.schema.dropTable("users");

export { up, down };
