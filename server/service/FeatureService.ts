import Knex from "knex";
import {IFeature, IDefect} from './models';

export class FeatureService {
    constructor(private knex: Knex) {}

    async showFeatures(spaceId:string){
        const features = await this.knex<IFeature>('spaces')
        .join('features', 'spaces.id','space_id')
        .where('spaces.id', spaceId)
        .select('feature', 'features.id')
        return features;
    }

    async showDefects(featureId:string){
        const defects = await this.knex<IDefect>('features')
        .join('defects', 'features.id', 'feature_id')
        .where('features.id', featureId)
        .select('issue', 'defects.id')
        return defects;
    }

    async checkRecordExistence (flatId: string, defectId: string){
        const records = await this.knex('records')
        .where('flat_id', flatId)
        .andWhere('defect_id', defectId)
        .count('id')
        return records;
    }

    async getFeaturesWithRecCount(flatID: number, spaceID: number) {
        return (await this.knex.raw(/**SQL */`
            select features.id as feature_id, features.feature, 
            defects.id as defect_id, defects.issue, count(records.id) 
            from flats inner join flat_structures 
            on flats.id = flat_structures.flat_id 
            inner join spaces on spaces.id = flat_structures.space_id 
            inner join features on spaces.id = features.space_id 
            inner join defects on features.id = defects.feature_id 
            left join records on defects.id = records.defect_id and flats.id = records.flat_id
            where flats.id = ? and spaces.id = ? 
            group by defects.id, features.id 
            order by defects.id;
        `, [flatID, spaceID])).rows as [{
            feature_id : number;
            feature : string;
            defect_id: number;
            issue : string;
            count : number;
        }];
    }


    // Newly added below
    async getFeatureById (featureId:string){
        const features = await this.knex<IFeature>('features')
        .where('features.id', featureId)
        .select('feature', 'features.id')
        return features;
    }

    async getDefectById(defectId:string){
        const defects = await this.knex<IDefect>('defects')
        .where('defects.id', defectId)
        .select('issue')
        return defects;
    }

}
