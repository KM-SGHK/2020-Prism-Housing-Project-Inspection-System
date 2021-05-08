import { IOldRecord } from './states';


// Action Creators
export function getRecordSuccess(record:IOldRecord[]) {
    return {
        type: "@@oldRecord/GET_RECORD" as "@@oldRecord/GET_RECORD",
        record
    }
}

export function editOldDescription(description:string) {
    return {
        type: "@@oldRecord/EDIT_DESCRIPTION" as "@@oldRecord/EDIT_DESCRIPTION",
        description
    }
}

export function saveEditedImage(image:string) {
    return {
        type: "@@oldRecord/SAVE_IMAGE" as "@@oldRecord/SAVE_IMAGE",
        image
    }
}

export function updateRecordSuccess(){
    return {
        type: "@@oldRecord/UPDATE_RECORD" as "@@oldRecord/UPDATE_RECORD",
    }
}

export function deleteRecordSuccess() {
    return {
        type: "@@oldRecord/DELETE_RECORD" as "@@oldRecord/DELETE_RECORD",
    }
}



type OldRecordActionCreators =  typeof getRecordSuccess | 
                                typeof editOldDescription |
                                typeof saveEditedImage |
                                typeof updateRecordSuccess |
                                typeof deleteRecordSuccess

export type IOldRecordActions = ReturnType<OldRecordActionCreators>