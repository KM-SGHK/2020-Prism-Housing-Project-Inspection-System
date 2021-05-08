import Knex from "knex";
// import express from 'express'


interface urgencyLevels{
    id: string,
    room: string,
    count: number
}

interface flatTypeNumber{
    type: string,
    count:number
}

interface type1Defects{
    id: number,
    type:string,
    count: number
}

interface subcontractorPerformance{
    name: string,
    count: number
}

interface getProgress{
    count: number
}

interface checkFlats {
    id: number,
    room: string,
    floor: number,
    tower: string,
    totalNumber_allDefects: string,
    totalNumber_inspectedDefects: string
}




export class ReportService {
    constructor(private knex: Knex){}

    async getUrgencyLevelsReport(){
        const result:urgencyLevels[] = await this.knex
        .select('flats.id', 'flats.room')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .groupBy('flats.id');

        return result
    }

    async getDefectedFlatNumberbyFlatType(){
        const result:flatTypeNumber[] = await this.knex
        .select('flats.type', this.knex.raw(`count(distinct flats.id)`))
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .groupBy('flats.type')

        return result
    }

    async getType1FlatInfo(){
        const result = await this.knex
        .select('flats.id', 'flats.type')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .groupBy('flats.id')
        .orderBy('flats.type');

        return result as any as type1Defects[]
    }
// Type 1 Flats, number of defects
    async getType1FlatInfoRN1(){
        const result = await this.knex
        .select('flats.id', 'flats.type')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .where('flats.type', '1 B.R. with balcony')
        .groupBy('flats.id')
        .havingRaw('count(*)<=?', [5])
        .orderBy('flats.type');

        return result as any as type1Defects[]
    }

    async getType1FlatInfoRN2(){
        const result = await this.knex
        .select('flats.id', 'flats.type')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .where('flats.type', '1 B.R. with balcony')
        .groupBy('flats.id')
        .havingRaw('count(*)>=? and count(*)<=?', [6,10])
        .orderBy('flats.type');

        return result as any as type1Defects[]
    }

    async getType1FlatInfoRN3(){
        const result = await this.knex
        .select('flats.id', 'flats.type')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .where('flats.type', '1 B.R. with balcony')
        .groupBy('flats.id')
        .havingRaw('count(*)>=?', [11])
        .orderBy('flats.type');

        return result as any as type1Defects[]
    }

    // Type 2 Flats, number of defects
    async getType2FlatInfoRN1(){
        const result = await this.knex
        .select('flats.id', 'flats.type')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .where('flats.type', '1 M.B.R & 1 B.R. with balcony')
        .groupBy('flats.id')
        .havingRaw('count(*)<=?', [5])
        .orderBy('flats.type');

        return result as any as type1Defects[]
    }

    async getType2FlatInfoRN2(){
        const result = await this.knex
        .select('flats.id', 'flats.type')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .where('flats.type', '1 M.B.R & 1 B.R. with balcony')
        .groupBy('flats.id')
        .havingRaw('count(*)>=? and count(*)<=?', [6,10])
        .orderBy('flats.type');

        return result as any as type1Defects[]
    }

    async getType2FlatInfoRN3(){
        const result = await this.knex
        .select('flats.id', 'flats.type')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .where('flats.type', '1 M.B.R & 1 B.R. with balcony')
        .groupBy('flats.id')
        .havingRaw('count(*)>=?', [11])
        .orderBy('flats.type');

        return result as any as type1Defects[]
    }

    
    // Type 3 Flats, number of defects
    async getType3FlatInfoRN1(){
        const result = await this.knex
        .select('flats.id', 'flats.type')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .where('flats.type', '2 B.R. without balcony')
        .groupBy('flats.id')
        .havingRaw('count(*)<=?', [5])
        .orderBy('flats.type');

        return result as any as type1Defects[]
    }

    async getType3FlatInfoRN2(){
        const result = await this.knex
        .select('flats.id', 'flats.type')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .where('flats.type', '2 B.R. without balcony')
        .groupBy('flats.id')
        .havingRaw('count(*)>=? and count(*)<=?', [6,10])
        .orderBy('flats.type');

        return result as any as type1Defects[]
    }

    async getType3FlatInfoRN3(){
        const result = await this.knex
        .select('flats.id', 'flats.type')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .where('flats.type', '2 B.R. without balcony')
        .groupBy('flats.id')
        .havingRaw('count(*)>=?', [11])
        .orderBy('flats.type');

        return result as any as type1Defects[]
    }

     // Type 4 Flats, number of defects
     async getType4FlatInfoRN1(){
        const result = await this.knex
        .select('flats.id', 'flats.type')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .where('flats.type', 'studio with balcony')
        .groupBy('flats.id')
        .havingRaw('count(*)<=?', [5])
        .orderBy('flats.type');

        return result as any as type1Defects[]
    }

    async getType4FlatInfoRN2(){
        const result = await this.knex
        .select('flats.id', 'flats.type')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .where('flats.type', 'studio with balcony')
        .groupBy('flats.id')
        .havingRaw('count(*)>=? and count(*)<=?', [6,10])
        .orderBy('flats.type');

        return result as any as type1Defects[]
    }

    async getType4FlatInfoRN3(){
        const result = await this.knex
        .select('flats.id', 'flats.type')
        .count('records.defect_id')
        .from('flats')
        .innerJoin('records', 'records.flat_id', 'flats.id')
        .where('flats.type', 'studio with balcony')
        .groupBy('flats.id')
        .havingRaw('count(*)>=?', [11])
        .orderBy('flats.type');

        return result as any as type1Defects[]
    }


    async getSubcontractorPerformance(){
        const result = await this.knex
        .select('subcontractors.name')
        .count('records.defect_id')
        .from('records')
        .innerJoin('subcontractors', 'records.subcontractor_id', 'subcontractors.id')
        .groupBy('subcontractors.name')

        return result as any as subcontractorPerformance[]
    }

    async getInspectionProgressInfo(){
        const result = await this.knex
        .select(this.knex.raw(`count(*)`))
        .from('flats')
        .where({'is_inspected':'true'})

        return result as any as getProgress[]
    }

    //Step 1: Prepare for a list of flats ready for report generation

    async checkFlatsForReports() {
        const results = await this.knex
            .select('flats.id', 'flats.room', 'flats.floor', 'flats.tower')
            .count('defects.id as totalNumber_allDefects')
            .count('records.id as totalNumber_inspectedDefects')
            .from('records')
            .rightJoin('defects', 'records.defect_id', 'defects.id')
            .join('features', 'defects.feature_id', 'features.id')
            .join('spaces', 'spaces.id', 'features.space_id')
            .join('flat_structures', 'spaces.id', 'flat_structures.space_id')
            .join('flats', 'flats.id', 'flat_structures.flat_id')
            .groupBy('flats.id')
            .orderBy('flats.id', 'asc')

        // console.log("Testing at Service"+JSON.stringify(results))
        console.log(results)



        return results as any as checkFlats[]
    }

    async checkFlatReportReadyRate() {
        const result = await this.knex
            .select(this.knex.raw(`count(*)`))
            .from('flats')
        console.log("testing no. of flats at service", result[0].count)
        return result as any[];
    }

       //Step 2: Check the availability of report doc for the selected flat

       async checkDocAvailability(flatID: number) {
        const result = await this.knex
            .select('flats.reportReady', 'flats.floor', 'flats.room')
            .from('flats')
            .where({ 'flats.id': flatID })
            .first();
        return result as any [];
    }

    async getDocFileName(flatID: number) {
        const result = await this.knex
            .select('flats.reportReady')
            .from('flats') 
            .where({ 'flats.id': flatID })

        return result as any[]
    }

    // Step 3: Update Flats Table after the doc has been created

    async updateFlatsTable(flatID: number, fileName: string) {
        console.log("Test at Service for updating the Flats Table")
        console.log(flatID)
        const result = await this.knex('flats')
            .where({ 'id': flatID })
            .update({ 'reportReady': fileName })

        return result
    }

    // Step 4: Get data for creating doc

    async getFlatSpaceId(flatID: number) {
        const result = await this.knex
            .select('spaces.id', 'spaces.space')
            .from('flats')
            .join('flat_structures', 'flat_structures.flat_id', 'flats.id')
            .join('spaces', 'spaces.id', 'flat_structures.space_id')
            .where({ 'flats.id': flatID })

        return result as any[]
    }

    async getSpaceFeatureId(spaceID: number) {
        const result = await this.knex
            .select('features.id')
            .from('spaces')
            .join('features', 'spaces.id', 'features.space_id')
            .where({ 'spaces.id': spaceID })

        return result as any[];
    }

    async getFeatureRecords(featureIDs: Array<number>) {
        console.log(featureIDs);
        const result = await this.knex
            .select('features.id as feature_id',
                'features.feature as feature_name',
                'defects.issue as defect_name',
                'records.id as record_id',
                'records.created_at as record_inspection_date',
                'records.description as record_illustration',
                'users.username as record_inspectorName')
            .from('records')
            .join('defects', 'defects.id', 'records.defect_id')
            .join('features', 'features.id', 'defects.feature_id')
            .join('users', 'users.id', 'records.user_inspector_id')
            .where('features.id', featureIDs);

        return result as any
    }


}