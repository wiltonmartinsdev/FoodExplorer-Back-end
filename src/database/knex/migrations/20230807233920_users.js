const up = (knex) =>
	knex.schema.createTable("users", (table) => {
		table.increments("ID");
		table.text("Name").notNullable();
		table.text("Email");
		table.text("Password");
		table.boolean("Admin_User").defaultTo(false);
		table.timestamp("Created_at").default(knex.fn.now());
		table.timestamp("Updated_at").default(knex.fn.now());
	});

const down = (knex) => knex.schema.dropTable("users");

export { up, down };
