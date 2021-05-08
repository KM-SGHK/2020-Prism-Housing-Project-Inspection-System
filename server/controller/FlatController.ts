import { Request, Response } from 'express';
import { FlatService } from '../service/FlatService';

export class FlatController {
    constructor(private flatService: FlatService) { }

    // searchFlats = async(req:Request, res: Response)=>{
    //     const {tower, room, floor, type} = req.query;
    //     let tower_ = tower == undefined ? '' : tower.toString().toUpperCase();
    //     let room_ = room == undefined ? '' : room.toString().toUpperCase();
    //     let floor_ = floor == undefined ? '' : floor.toString().toUpperCase();
    //     let type_ = type == undefined ? '' : type.toString().toUpperCase();

    //     res.json(await this.flatService.getFlats(tower_,room_, floor_, type_));
    // }

    searchTowers = async (req: Request, res: Response) => {
        try {
            res.json(await this.flatService.getTower());
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ message: "cannot get tower" });
        }
    }

    searchFloors = async (req: Request, res: Response) => {
        try {
            res.json(await this.flatService.getFloor());
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ message: "cannot get floor" });
        }
    }

    searchRooms = async (req: Request, res: Response) => {
        try {
            res.json(await this.flatService.getRoom());
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ message: "cannot get room" });
        }
    }

    searchTypes = async (req: Request, res: Response) => {
        try {
            res.json(await this.flatService.getType());
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ message: "cannot get types" });
        }
    }

    searchFlats = async (req: Request, res: Response) => {
        const {tower, room, floor, type} = req.query;
        let tower_ = tower == undefined ? '' : tower.toString().toUpperCase();
        let room_ = room == undefined ? '' : room.toString().toUpperCase();
        let floor_ = floor == undefined ? '' : floor.toString().toUpperCase();
        let type_ = type == undefined ? '' : type.toString();
        try {
            res.json(await this.flatService.getFlats(tower_,room_,floor_,type_.replace('&','%26')));
            // res.json(await this.flatService.getFlatsV2(req.query as any));
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ message: "cannot get flats" });
        }
    }

    // searchLastModified = async (req: Request, res: Response) => {
    //     const {flatId} = req.params;
    //     try{
    //         res.json(await this.flatService.getLastModified(flatId));
    //     }
    //     catch(err){
    //         console.log(err);
    //         res.status(400).json({message: "cannot get last modified date"})
    //     }
    // }


}