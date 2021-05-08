import { Request, Response } from 'express';
import { RecordService } from '../service/RecordService';
import path from 'path';


export class RecordController {
    constructor(private recordService: RecordService) { }


    getRecordById = async (req: Request, res: Response) => {
        try {
            const flat_id = parseInt(req.params.flatId)
            const defect_id = parseInt(req.params.defectId);

            console.log("REQ.PARAMS at RecordController:");
            console.log(req.params);
            const record = await this.recordService.getRecordById(flat_id, defect_id);
            console.log("record get from recordService");
            console.log(record);
            res.json(record);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "cannot get" });
        }
    }

    getImageByURL = async (req: Request, res: Response) => {
        try {
            const flat_id = parseInt(req.params.flatId)
            const defect_id = parseInt(req.params.defectId);
            const imageURL = await this.recordService.getImageByURL(flat_id, defect_id);

            // response is blob image instead of JSON string
            const file =  path.join(__dirname, `../protected_inspector/uploads/photos_defect_records/${imageURL[0].image}`)
            res.download(file);
            
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "cannot get" });
        }
    }


    addRecord = async (req: Request, res: Response) => {
        // console.log("[POST] req.body at controller");
        // console.log(req.body);
        // console.log("[POST] req.file at controller");
        // console.log(req.file);

        try {
            if (req.file) {
                const body = {
                    description: req.body.description,
                    status: req.body.status,
                    flat_id: req.body.flat_id,
                    space_id: req.body.space_id,
                    defect_id: req.body.defect_id,
                    // user_inspector_id: req.session?.user.id, // Todo: change to user_id with token
                    user_inspector_id: req.body.user_id,
                    defectX: req.body.defectX,
                    defectY: req.body.defectY,
                    filename: req.file.filename,
                }
                // console.log("body to be sent to Service (if image exists)")
                // console.log(body);
                await this.recordService.addRecord(body);
                res.json({ updated: 1, name: req.file.originalname });
            } else {
                const body = {
                    description: req.body.description,
                    status: req.body.status,
                    flat_id: req.body.flat_id,
                    space_id: req.body.space_id,
                    defect_id: req.body.defect_id,
                    // user_inspector_id: req.session?.user.id, // Todo: change to user_id with token
                    user_inspector_id: req.body.user_id,
                    defectX: req.body.defectX,
                    defectY: req.body.defectY
                }
                await this.recordService.addRecord(body);
                res.json({ updated: 1 });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "cannot post" });
        }
    }


    updateRecord = async (req: Request, res: Response) => {
        // console.log("[PUT] req.body at controller");
        // console.log(req.body); //只accept form-urlencoded
        try {
            const record_id = parseInt(req.params.recordId);

            if (isNaN(record_id)) {
                    res.status(400).json({ msg: "id is not a number" });
                    return;
                }

            if (req.file) {
                const body = {
                    description: req.body.description,
                    filename: req.file.filename,
                }
                const updated = await this.recordService.updateRecord(record_id, body)
                res.json({ updated });
            } else {
                const body = {
                    description: req.body.description,
                }
                console.log('==============RECORD CONTROLLER (UPDATE)==============')
                console.log(record_id, body);
                const updated = await this.recordService.updateRecord(record_id, body)
                res.json({ updated });
            }
            // const id = parseInt(req.params.recordId);
            // if (isNaN(id)) {
            //     res.status(400).json({ msg: "id is not a number" });
            //     return;
            // }
            // if ... else
            // filename: req.file.filename,
            // defectX: req.body.defectX,
            // defectY: req.body.defectY

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "cannot update" });
        }
    }


    deleteRecord = async (req: Request, res: Response) => {
        const id = parseInt(req.params.recordId)
        if (isNaN(id)) {
            res.status(400).json({ msg: "id is not a number" })
            return;
        }
        const deleted = await this.recordService.deleteRecord(id);
        res.json({ deleted });
    }

}