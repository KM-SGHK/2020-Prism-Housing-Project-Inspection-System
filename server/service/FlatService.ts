import Knex from "knex";
import { Iflat, ITower, IFloor, IRoom, IType } from './models';

export class FlatService {
    constructor(private knex: Knex) { }

    async getTower(){
        const towers = await this.knex<ITower>("flats")
            .distinct('tower');
        console.log(towers);
        return towers;
    }

    async getFloor(){
        const floors = await this.knex<IFloor>("flats")
            .distinct(this.knex.raw('floor::int'))
            .orderBy('floor','asc');
        console.log(floors);
        return floors;
    }

    async getRoom(){
        const rooms = await this.knex<IRoom>("flats")
            .distinct('room')
            .orderBy('room','asc');
        console.log(rooms);
        return rooms;
    }

    async getType(){
        const types = await this.knex<IType>("flats")
            .distinct('type')
            .orderBy('type','asc');
        console.log(types);
        return types;
    }

    async getFlats(tower_: string, room_: string, floor_: string, type_: string) {
        const flats1 = await this.knex<Iflat>()
            .select(this.knex.raw(
            `flats.id,
            flats.tower,
            flats.floor,
            flats.room,
            flats.size_in_sq_ft,
            flats.floorplan,
            flats.target_completion_date,
            updated_table.last_modified_date,
            defect_count.defects_total,
            flats.type`))
            .from('flats')
            .join(this.knex.raw(
            `(
                select records.flat_id, 
                max(records.updated_at) as last_modified_date 
                from records 
                group by flat_id
                )
            as updated_table
            on flats.id = flat_id`))
            .join(this.knex.raw(
                `(
                    select records.flat_id, 
                    count(records.flat_id) as defects_total
                    from records group by flat_id 
                    )
                    as defect_count
                    on flats.id = defect_count.flat_id`))
            .where("tower", "like", "%" + tower_ + "%")
            .andWhere("room", "like", "%" + room_ + "%")
            .andWhere("floor", "like", "%" + floor_ + '%')
            .andWhere("type", "like", "%" + type_ + "%")
            .orderBy('flats.id');

        const flats2 = await this.knex<Iflat>()
        .select(this.knex.raw(
        `flats.id,
        flats.tower,
        flats.floor,
        flats.room,
        flats.size_in_sq_ft,
        flats.floorplan,
        flats.target_completion_date,
        updated_table.last_modified_date,
        defect_count.defects_total`))
        .from('flats')
        .join(this.knex.raw(
        `(
            select records.flat_id, 
            max(records.updated_at) as last_modified_date 
            from records 
            group by flat_id
            )
            as updated_table
            on flats.id = flat_id`))
        .join(this.knex.raw(
            `
            (select records.flat_id, 
            count(records.flat_id) as defects_total
            from records group by flat_id 
            )
            as defect_count
            on flats.id = defect_count.flat_id
            `))
        .where("tower", "like", "%" + tower_ + "%")
        .andWhere("room", "like", "%" + room_ + "%")
        .andWhere("floor", "=",floor_)
        .andWhere("type", "like", "%" + type_ + "%")
        .orderBy('flats.id');

        let parsedFloor = parseInt(floor_,10);
        console.log(parsedFloor);
        // if(parsedFloor >= 9 || isNaN){
        //     return flats1;
        // }
        // else 
        if (parsedFloor === 1){
            return flats2;
        }
        else {
            return flats1;
            
        }
    }

    // async getFlatsV2(params: { [x: string]: string }) {
    //     const query = this.knex<Iflat>("flats");
    //     for (let column of ['tower', 'room', 'floor', 'type']) {
    //         if (params[column]) {
    //             query.where(column, params[column].toString());
    //         }
    //     }
    //     query.orderBy('id');
    //     console.log(query.toSQL());
    //     return await query;
    // }

//     async getLastModified(flatId:string){
//         const date = this.knex("records")
//         .where("flat_id", "=", flatId)
//         .max("updated_at")

//         return date;
//     }
}