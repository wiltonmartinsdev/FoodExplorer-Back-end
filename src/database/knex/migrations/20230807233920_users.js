const up = (knex) =>
	knex.schema.createTable("users", (table) => {
		table.increments("Id");
		table.text("Name").notNullable();
		table.text("Email").notNullable();
		table.text("Password").notNullable();
		table.boolean("AdminUser").defaultTo(false);
		table.timestamp("CreatedAt").default(knex.fn.now());
	});

const down = (knex) => knex.schema.dropTable("users");

export { up, down };
