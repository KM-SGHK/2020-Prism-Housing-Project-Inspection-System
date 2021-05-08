import { IOldRecordState } from "./states";
import { IOldRecordActions } from './actions';


const initialState = {
    record:[]
}

export const oldRecordReducers = (state:IOldRecordState = initialState, action:IOldRecordActions):IOldRecordState => {
    switch(action.type){
        case "@@oldRecord/GET_RECORD":
            return {
                record: action.record
            }
        case "@@oldRecord/EDIT_DESCRIPTION":
            return {
                record: [
                    {
                        ...state.record[0], // to state that other types aren't changed
                        description: action.description
                    }
                ]
            }
        case  "@@oldRecord/SAVE_IMAGE":
            return {
                record: [
                    {
                        ...state.record[0],
                        image: action.image
                    }
                ]
            }
        case "@@oldRecord/UPDATE_RECORD":
            return {
                record:[],
            }
        case "@@oldRecord/DELETE_RECORD":
            return {
                record:[],
            }
        default:
            return state
    }
}