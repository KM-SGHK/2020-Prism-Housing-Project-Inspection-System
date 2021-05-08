import xlsx from "xlsx"; //install: yarn add xlsx @types/xlsx
import Knex from "knex";

const knexConfig = require("./knexfile")['development'];


interface IFlatStructure {
    space_id: number;
    flat_id: number;
    centroidX: number;
    centroidY: number;
}



async function main() {
    //4.3. Data Insertion 次序: users--> categories--> files (foreign key問題)
    const knex = Knex(knexConfig) //4.3.1. 先打呢句
    try {
        const file = xlsx.readFile("./project02-flats-flat_structures.xlsx");
        const flatStructures: IFlatStructure[] = xlsx.utils.sheet_to_json(file.Sheets["flat-structures"]);
        await insertFiles(knex, flatStructures);

    } catch (err) {
        console.log(err.message);
    }
    
    await knex.destroy();

}


async function insertFiles(knex: Knex, flatStructures: IFlatStructure[]) {
    const trx = await knex.transaction()
    try {
        for (const flatStructure of flatStructures) {
            await knex('flat_structures').insert({
                space_id: flatStructure.space_id,
                flat_id: flatStructure.flat_id,
                centroidX: flatStructure.centroidX,
                centroidY: flatStructure.centroidY,
            })
        }

        await trx.commit();
    } catch (err) {
        await trx.rollback();
        throw err;
    }
}

main();