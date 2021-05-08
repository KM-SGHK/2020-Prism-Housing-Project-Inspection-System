import xlsx from "xlsx"; //install: yarn add xlsx @types/xlsx
import Knex from "knex";

const knexConfig = require("./knexfile")['development'];

console.log(knexConfig)

interface IFlat {
    tower: string;
    room: string;
    floor: string;
    size_in_sq_ft: string;
    type: string;
    floorplan: Text;
    is_inspected: boolean;
    target_completion_date: Date;
}


async function main() {
    //4.3. Data Insertion 次序: users--> categories--> files (foreign key問題)
    const knex = Knex(knexConfig) //4.3.1. 先打呢句
    try {
        const file = xlsx.readFile("./project02-flats-flat_structures.xlsx");
        const flats: IFlat[] = xlsx.utils.sheet_to_json(file.Sheets["flat-info"]);
        await insertFlats(knex, flats);

    } catch (err) {
        console.log(err.message)
    }
    
    await knex.destroy();

}


async function insertFlats(knex: Knex, flats: IFlat[]) {
    const trx = await knex.transaction()
    try {
        for (const flat of flats) {
            await knex('flats').insert({
                room: flat.room,
                floor: flat.floor,
                tower: flat.tower,
                size_in_sq_ft: flat.size_in_sq_ft,
                type: flat.type,
                floorplan: flat.floorplan,
                is_inspected: flat.is_inspected,
                target_completion_date: flat.target_completion_date,
            })
        }


        await trx.commit();
    } catch (err) {
        await trx.rollback()
        throw err;
    }
}

main();