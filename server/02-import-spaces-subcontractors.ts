import xlsx from "xlsx"; //install: yarn add xlsx @types/xlsx
import Knex from "knex";


const knexConfig = require("./knexfile")['development'];

interface ISpace {
    space: string
}

interface ISubcontractor {
    name: string
}



async function main() {
    const knex = Knex(knexConfig)
    try {
        const file = xlsx.readFile("./project02-spaces-features-defects.xlsx");

        const spaces: ISpace[] = xlsx.utils.sheet_to_json(file.Sheets["spaces"]);
        const subcontractors: ISubcontractor[] = xlsx.utils.sheet_to_json(file.Sheets["subcontractors"]);

        await insertSpaces(knex, spaces);
        await insertSubcontractors(knex, subcontractors);

    } catch (err) {
        console.log(err.message);
    }
    await knex.destroy();

}

async function insertSpaces(knex: Knex, spaces: ISpace[]) {
    const trx = await knex.transaction();
    try {
        for (const space of spaces) {
            await knex('spaces').insert({
                space: space.space
            })
        }

        await trx.commit();
    } catch (err) {
        await trx.rollback();
        throw err;
    }
}


async function insertSubcontractors(knex: Knex, subcontractors: ISubcontractor[]) {
    const trx = await knex.transaction();
    try {
        for (const subcontractor of subcontractors) {
            await knex('subcontractors').insert({
                name: subcontractor.name
            })
        }

        await trx.commit();
    } catch (err) {
        await trx.rollback();
        throw err;
    }
}


main();
