import {Request,Response} from 'express';
import {FeatureService} from '../service/FeatureService';

export class FeatureController{
    constructor(private featureService: FeatureService){}

    showFeatures = async(req:Request, res: Response)=>{
        const {spaceId} = req.params;
        console.log(`Space Id is ${spaceId}`);
        res.json(await this.featureService.showFeatures(spaceId));
    }

    showDefects = async(req:Request, res: Response)=>{
        const {featureId} = req.params;
        console.log(`feature id is ${featureId}`)
        res.json(await this.featureService.showDefects(featureId));
    }

    checkRecordExistence = async(req:Request, res: Response)=>{
        const {flatId, defectId} = req.params;
        // console.log(`flat Id is ${flatId}. Defect Id is ${defectId}`)
        res.json(await this.featureService.checkRecordExistence(flatId, defectId));
    }

    jasonTest = async(req:Request, res: Response)=>{
        try {
            const {flatId, spaceId} = req.params;
            const flatIdInt = parseInt(flatId);
            const spaceIdInt = parseInt(spaceId);
            // if (NaN) {...}
            const rows = await this.featureService.getFeaturesWithRecCount(flatIdInt, spaceIdInt);
            const result = {} as any; // should have type
            for (const row of rows) {
                const {defect_id, issue, count, feature_id, feature} = row; // row = object
                const defect = {defect_id, issue, hasRec: count > 0};
                if (feature_id in result) {
                    result[feature_id].defects.push(defect);
                } else {
                    result[feature_id] = { feature_id, feature, defects: [defect] };
                }
            }
            res.json(Object.values(result));
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }
    }



    // Newly added below
    getFeatureById = async(req:Request, res: Response)=>{
        const {featureId} = req.params;
        const feature = res.json(await this.featureService.getFeatureById(featureId));

        console.log(feature);
    }

    getDefectById = async(req:Request, res: Response)=>{
        const {defectId} = req.params;
        const defect = res.json(await this.featureService.getDefectById(defectId));

        console.log(defect);
    }
    

}