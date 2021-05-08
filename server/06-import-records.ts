import xlsx from "xlsx"; //install: yarn add xlsx @types/xlsx
import Knex from "knex";


const knexConfig = require("./knexfile")['development'];


export interface IRecord{
    correction_due_date: Date;
    description: Text;
    defect_id: number;
    flat_id: number;
    image: Text;
    status: string;
    subcontractor_id: number;
    user_inspector_id: number;
    defectX: number;
    defectY: number;
}


async function main() {
    //4.3. Data Insertion 次序: users--> categories--> files (foreign key問題)
    const knex = Knex(knexConfig); //4.3.1. 先打呢句
    try {
        const file = xlsx.readFile("./project02-records.xlsx");
        const records: IRecord[] = xlsx.utils.sheet_to_json(file.Sheets["records"]);
        await insertFiles(knex, records);

    } catch (err) {
        console.log(err.message);
    }

    await knex.destroy();
}


async function insertFiles(knex: Knex, records: IRecord[]) {
    const trx = await knex.transaction()
    try {
        for (const record of records) {
            await knex('records').insert({
                correction_due_date: record.correction_due_date,
                defect_id: record.defect_id,
                description: record.description,
                flat_id: record.flat_id,
                image: record.image,
                status: record.status,
                subcontractor_id: record.subcontractor_id,
                user_inspector_id: record.user_inspector_id ,
                defectX: record.defectX,
                defectY: record.defectY,
            })
        }

        await trx.commit();
        
    } catch (err) {
        await trx.rollback()
        throw err;
    }
}

main();