import { ISpace, SpaceActions } from "./actions";
import { IFlat } from "../flat/SearchActions";

export interface ISelectedSpaceState {
    selectedFlatInfo: IFlat[]
    result: ISpace[]
}

const SelectedSpaceInitialState: ISelectedSpaceState ={
    selectedFlatInfo: [],
    result: []
}


export function SpaceReducer(state: ISelectedSpaceState = SelectedSpaceInitialState, action: SpaceActions): ISelectedSpaceState {
    switch(action.type){
        case '@@space/SHOWN_SPACES':
        return{
            ...state,
            result: action.spaces
        }
        case '@@space/SHOWN_SELECTED_FLAT_INFO':
            return{
                ...state,
                selectedFlatInfo: action.selectedFlatInfo
            }
        default:
            return state;
    }
}