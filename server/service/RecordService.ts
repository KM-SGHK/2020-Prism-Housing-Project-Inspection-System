import { IRecord } from './models';
import * as Knex from 'knex';

export class RecordService {
    constructor(private knex: Knex) {

    }

    async getRecordById(flat_id: number, defect_id: number) {
        return (this.knex
            .select('records.id as record_id',
                'records.created_at as inspection_timestamp',
                'records.correction_due_date as correction_due_date',
                'records.flat_id',
                'records.status',
                'records.image',
                'records.description',
                'defects.issue',
                'features.feature',
                'features.space_id',
                'users.username as inspector_name',
                'defectX',
                'defectY')
            .from('records')
            .join('defects', 'defects.id', 'records.defect_id')
            .join('features', 'features.id', 'defects.feature_id')
            .join('users', 'users.id', 'records.user_inspector_id')
            .where({ 'records.flat_id': flat_id, 'records.defect_id': defect_id })
        );
    }

    async getImageByURL(flat_id: number, defect_id: number) {
        return (this.knex
            .select('records.image')
            .from('records')
            .join('defects', 'defects.id', 'records.defect_id')
            .where({ 'records.flat_id': flat_id, 'records.defect_id': defect_id })
        );
    }


    async addRecord(body: IRecord) {
        if (body.filename) {
            const description = body.description;
            const status = body.status;
            const flat_id = body.flat_id;
            const defect_id = body.defect_id;
            const user_inspector_id = body.user_inspector_id;
            const image = body.filename;
            const defectX = body.defectX;
            const defectY = body.defectY;

            return (await this.knex.insert({
                description,
                status,
                flat_id,
                defect_id,
                user_inspector_id,
                image,
                defectX,
                defectY
            }).into('records').returning('id'));
            
        } else {
            const description = body.description;
            const status = body.status;
            const flat_id = body.flat_id;
            const defect_id = body.defect_id;
            const user_inspector_id = body.user_inspector_id;
            const defectX = body.defectX;
            const defectY = body.defectY;

            return (await this.knex.insert({
                description,
                status,
                flat_id,
                defect_id,
                user_inspector_id,
                defectX,
                defectY
            }).into('records').returning('id'));
        }
    }


    async updateRecord(id: number, body: any) { 
        // Todo: change type from any to IRecord
        //! Add if else for file

        if (body.filename) {
            const description = body.description;
            const image = body.filename;
            
            console.log('==============RECORD SERVICE (UPDATE)==============');
            console.log(id, body);

            return await this.knex('records').update({
                description,
                image,
                // defectX,
                // defectY
            }).where('id', id)
                .returning('id');

        } else {
            const description = body.description;

            console.log('==============RECORD SERVICE (UPDATE)==============');
            console.log(id, body);

            return await this.knex('records').update({
                description,
                // defectX,
                // defectY
            }).where('id', id)
                .returning('id');
        }
        // const defectX = body.defectX;
        // const defectY = body.defectY;

    }


    async deleteRecord(id: number) {
        return await this.knex('records').where('id', id).del();
    }

}