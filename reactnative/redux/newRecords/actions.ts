import { INewRecordState } from "./states";
import { saveEditedImage } from "../oldRecords/actions";

export function editDescription(description: string) {
    return {
        type: "@@newRecord/EDIT_DESCRIPTION" as "@@newRecord/EDIT_DESCRIPTION",
        description
    }
}


export function saveEditedNewImage(imageURL:string){
    return {
        type: "@@newRecord/SAVE_EDITED_IMAGE" as "@@newRecord/SAVE_EDITED_IMAGE",
        imageURL
    }
}


export function addPhoto(imageURL: string) {
    return {
        type: "@@newRecord/ADD_PHOTO" as "@@newRecord/ADD_PHOTO",
        imageURL
    }
}


export function postRecordSuccess(newRecord:INewRecordState){
    return {
        type: "@@newRecord/POST_RECORD" as "@@newRecord/POST_RECORD",
        newRecord
    }
}

export function saveTempDefectXY(defectX: number, defectY: number){
    return{
        type:"@@newRecord/SAVE_TEMP_DEFECT_XY" as "@@newRecord/SAVE_TEMP_DEFECT_XY",
        defectX,
        defectY
    }
}

type NewRecordActionCreators =  typeof editDescription | 
                                typeof saveEditedNewImage | 
                                typeof postRecordSuccess | 
                                typeof addPhoto |
                                typeof saveTempDefectXY

export type INewRecordActions = ReturnType<NewRecordActionCreators>