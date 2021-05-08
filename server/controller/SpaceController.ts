import {Request,Response} from 'express';
import {SpaceService} from '../service/SpaceService';
import path from 'path';

export class SpaceController{
    constructor(private spaceService: SpaceService){}

    showFlat = async(req:Request, res: Response)=>{
        // try catch
        const {flatId} = req.params;
        console.log(`Flat Id is ${flatId}`)
        res.json(await this.spaceService.showFlat(flatId));
    }

    showSpaces = async(req:Request, res: Response)=>{
        // try catch
        const {flatId} = req.params;
        res.json(await this.spaceService.showSpaces(flatId));
        // console.log(result)
    }

    getFloorPlanByURL = async (req: Request, res: Response) => {
        try {
            const flat_id = parseInt(req.params.flatId)
            const floorPlanURL = await this.spaceService.getFloorPlanByURL(flat_id);

            // response is blob image instead of JSON string
            const file =  path.join(__dirname, `../protected_inspector/uploads/floorplans/${floorPlanURL[0].floorplan}`)
            res.download(file);
            
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "cannot get" });
        }
    }

}