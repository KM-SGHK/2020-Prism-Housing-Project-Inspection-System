import { INewRecordState} from './states'
import { INewRecordActions } from './actions';

const initialState = {
    imageURL: null,
    // status: "",
    // flat_id: null,
    // space_id: null,    
    // defect_id: null,
    description: "",
    defectX: -100,
    defectY: -100
}

export const newRecordReducers = (state:INewRecordState = initialState, action:INewRecordActions):INewRecordState => {
    switch(action.type){
        case "@@newRecord/EDIT_DESCRIPTION":
            return {
                ...state,
                description: action.description
            }
        case "@@newRecord/SAVE_EDITED_IMAGE":
        return {
            ...state,
            imageURL: action.imageURL
        }
        case "@@newRecord/ADD_PHOTO":
            return {
                ...state,
                imageURL: action.imageURL
            }
        case "@@newRecord/POST_RECORD":
            return {
                ...state,
                description: "",
                defectX: -100,
                defectY: -100
            }
        case "@@newRecord/SAVE_TEMP_DEFECT_XY":
            return{
                ...state,
                defectX: action.defectX,
                defectY: action.defectY
            }
        default:
            return state
    }
}
