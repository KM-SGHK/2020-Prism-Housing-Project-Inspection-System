import { Request, Response } from 'express';
import { FloorPlanService } from '../service/FloorPlanService';

export class FloorPlanController {
    constructor(private floorPlanService: FloorPlanService) { }

    getFloorPlanRecords= async (req: Request, res: Response) => {
        const flatId = parseInt(req.params.flatId);
        try {
            res.json(await this.floorPlanService.getFloorPlanRecords(flatId));
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ message: "cannot get tower" });
        }
    }
}