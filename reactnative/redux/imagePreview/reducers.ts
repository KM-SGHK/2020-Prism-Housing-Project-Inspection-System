import { IImagePreviewState } from './states'
import { IImagePreviewActions } from './actions';


const initialState = {
    status: false
}


export const imagePreviewReducers = (state:IImagePreviewState = initialState, action:IImagePreviewActions):IImagePreviewState => {
    switch(action.type){
        case "@@imagePreview/PREVIEW_SWITCH":
            return{
                ...state,
                status: action.status
            }
        default:
            return state
    }
}
