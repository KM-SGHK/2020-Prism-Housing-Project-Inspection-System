import * as Knex from "knex";
import { hashPassword } from '../hash'

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries

    await knex("roles").del()
        .then(() => {
            return knex("roles").insert
                ([
                    { role: "developer" },
                    { role: "inspector" }
                ]);
        });

    const password1 = await hashPassword('0102')
    const password2 = await hashPassword('0304')
    const password3 = await hashPassword('0405')

    await knex("users").del()
        .then(() => {
            // Inserts seed entries
            return knex("users").insert
                ([
                    { username: "samuel", password: password1, role_id: 1 },
                    { username: 'ming', password: password2, role_id: 2 },
                    { username: 'helen', password: password3, role_id: 2 }
                ]
                );
        });

    // await knex.destroy();
};
