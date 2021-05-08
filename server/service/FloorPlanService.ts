import Knex from "knex";
import { IRecord} from './models';

export class FloorPlanService {
    constructor(private knex: Knex) {}

    async getFloorPlanRecords(flatId: number){
        const records = await this.knex<IRecord>('records')
        .join('defects', 'records.defect_id', 'defects.id')
        .join('features', 'defects.feature_id', 'features.id')
        .select('defectX', 'defectY', 'issue', 'feature', 'description', 'updated_at','status')
        .where ('flat_id', flatId);

        return records;
    }
}