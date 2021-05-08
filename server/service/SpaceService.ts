import Knex from "knex";
import {Iflat} from './models';
// import {TABLES} from '../tables';

export class SpaceService {
    constructor(private knex: Knex) {}
  
    async showFlat(flatId:string) {
        const flat = await this.knex<Iflat>("flats") 
        .where("id", "=", flatId);
        return flat;
    }  

    async showSpaces(flatId:string){
        return (await this.knex.raw(`select spaces.space, spaces.id , get_count_table.defects_number, flat_structures.flat_id, flat_structures."centroidX", flat_structures."centroidY"
            from flat_structures 
            join flats on flats.id = flat_structures.flat_id 
            join spaces on spaces.id = flat_structures.space_id 
            left join (
            select count(records.id) as defects_number, spaces.space, spaces.id as space_id, flat_id from records
            join defects on defects.id = records.defect_id 
            join features on features.id = defects.feature_id
            join spaces on spaces.id = features.space_id 
            where flat_id = ?
            group by spaces.id, flat_id ) as get_count_table on spaces.id = get_count_table.space_id
            where flats.id = ?;`, [flatId, flatId])).rows;
    }

    async getFloorPlanByURL(flat_id: number) {
        return (this.knex
            .select('floorplan')
            .from('flats')
            .where( 'flats.id',"=", flat_id)
        );
    }
}
