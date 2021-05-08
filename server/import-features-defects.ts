import xlsx from "xlsx"; //install: yarn add xlsx @types/xlsx
import Knex from "knex";


const knexConfig = require("./knexfile")['development'];

console.log(knexConfig)

// interface ISpace{
//     space:string
// }

interface IFeature{
    feature: string,
    space_id: number
    subcontractor_id:number
}

interface IDefect{
    issue: string,
    feature_id: number
}


// interface ISubcontractor{
//     name: string
// }



async function main() {
    const knex = Knex(knexConfig) 
    try{
        const file = xlsx.readFile("./project02-spaces-features-defects.xlsx");
        // const spaces: ISpace[]=xlsx.utils.sheet_to_json(file.Sheets["spaces"]);
        const features: IFeature[]=xlsx.utils.sheet_to_json(file.Sheets["features"]);
        const defects: IDefect[]=xlsx.utils.sheet_to_json(file.Sheets["defects"]);
        // const subcontractors: ISubcontractor[]=xlsx.utils.sheet_to_json(file.Sheets["subcontractors"]);
        // await insertSpaces(knex, spaces);
        // await insertSubcontractors(knex, subcontractors);
        await insertFeatures(knex, features);
        await insertDefects(knex, defects);
        
    }catch (err) {
        console.log(err.message)
    }
    await knex.destroy();

}

// async function insertSpaces(knex: Knex, spaces: ISpace[]) {
//     const trx = await knex.transaction()
//     try{
//         for (const space of spaces) {
//             await knex('spaces').insert({
//              space: space.space
//             })
//         }

//         await trx.commit
//     } catch (err) {
//         await trx.rollback()
//         throw err;
//     }
// }

async function insertFeatures(knex: Knex, features: IFeature[]) {
    const trx = await knex.transaction()
    try{
        for (const feature of features) {
            await knex('features').insert({
             feature: feature.feature,
             space_id: feature.space_id,
             subcontractor_id: feature.subcontractor_id
            })
        }

        await trx.commit
    } catch (err) {
        await trx.rollback()
        throw err;
    }
}

async function insertDefects(knex: Knex, defects: IDefect[]) {
    const trx = await knex.transaction()
    try{
        for (const defect of defects) {
            await knex('defects').insert({
             issue: defect.issue,
             feature_id: defect.feature_id
            })
        }

        await trx.commit
    } catch (err) {
        await trx.rollback()
        throw err;
    }
    await knex.destroy(); 

}

// async function insertSubcontractors(knex: Knex, subcontractors: ISubcontractor[]) {
//     const trx = await knex.transaction()
//     try{
//         for (const subcontractor of subcontractors) {
//             await knex('subcontractors').insert({
//              name: subcontractor.name
//             })
//         }

//         await trx.commit
//     } catch (err) {
//         await trx.rollback()
//         throw err;
//     }
//     await knex.destroy(); 

// }






main();
