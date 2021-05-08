import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('roles', table => {
    table.increments();
    table.string("role"); //unique
  });

  await knex.schema.createTable('users', table => {
    table.increments();
    table.string("username").notNullable(); //unique
    table.string("password").notNullable(); //unique
    table.integer("role_id").unsigned();
    table.foreign("role_id").references("roles.id");
    table.timestamps(false, true);
  });

  await knex.schema.createTable('spaces', table => {
    table.increments();
    table.string("space").notNullable();
  });

  await knex.schema.createTable('flats', table => {
    table.increments();
    table.string("room").notNullable();
    table.string("floor").notNullable();
    table.string("tower").notNullable();
    table.integer("size_in_sq_ft").unsigned();
    table.string("type"); //reference??
    table.text("floorplan"); //floor_plan
    table.boolean("is_inspected");
    table.date("target_completion_date");
    table.string("reportReady");
  });

  await knex.schema.createTable('subcontractors', table => {
    table.increments();
    table.string("name").notNullable();
  });

  await knex.schema.createTable('features', table => {
    table.increments();
    table.string("feature").notNullable();
    table.integer("space_id").unsigned();
    table.foreign("space_id").references("spaces.id");
    table.integer("subcontractor_id").unsigned();
    table.foreign("subcontractor_id").references("subcontractors.id");
  });

  await knex.schema.createTable('defects', table => {
    table.increments();
    table.string("issue").notNullable();
    table.integer("feature_id").unsigned();
    table.foreign("feature_id").references("features.id");
  });

  await knex.schema.createTable('flat_structures', table => {
    table.increments();
    table.integer("space_id").unsigned();
    table.foreign("space_id").references("spaces.id");
    table.integer("flat_id").unsigned();
    table.foreign("flat_id").references("flats.id");
    table.integer("centroidX").unsigned();
    table.integer("centroidY").unsigned();
  });

  await knex.schema.createTable('records', table => {
    table.increments();
    table.timestamps(false, true);
    table.dateTime("correction_due_date");
    table.string("status"); //reference??
    table.text("image"); //separate table?
    table.text("description");
    table.integer("subcontractor_id").unsigned();
    table.foreign("subcontractor_id").references("subcontractors.id");
    table.integer("defect_id").unsigned();
    table.foreign("defect_id").references("defects.id");
    table.integer("flat_id").unsigned();
    table.foreign("flat_id").references("flats.id");
    table.integer("user_inspector_id").unsigned();
    table.foreign("user_inspector_id").references("users.id");
    table.integer("defectX").unsigned();
    table.integer("defectY").unsigned();
  });
}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('records');
  await knex.schema.dropTable('flat_structures');
  await knex.schema.dropTable('defects');
  await knex.schema.dropTable('features');
  await knex.schema.dropTable('subcontractors');
  await knex.schema.dropTable('flats');
  await knex.schema.dropTable('spaces');
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('roles');
};

