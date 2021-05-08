import { ThunkDispatch, RootState } from "../../store"
import config from "../../config"
import { IFlat } from "../flat/SearchActions"

export interface ISpace{
    id: number;
    defects_number: number;
    space: string;
    flat_id: number;
    centroidX: number;
    centroidY: number;
}

export function shownSelectedFlatInfo(selectedFlatInfo: IFlat[]){
    return{
        type: "@@space/SHOWN_SELECTED_FLAT_INFO" as "@@space/SHOWN_SELECTED_FLAT_INFO",
        selectedFlatInfo: selectedFlatInfo
    }
}

export function shownSpaces(spaces: ISpace[]){
    return{
        type: "@@space/SHOWN_SPACES" as "@@space/SHOWN_SPACES",
        spaces: spaces
    }
}

export type SpaceActions = ReturnType<typeof shownSpaces| typeof shownSelectedFlatInfo>

export function showSpace(selectedFlatId: string){
    return async(dispatch:ThunkDispatch)=>{
        const res = await fetch (`${config.BACKEND_URL}/inspector/flats/${selectedFlatId}/spaces`)
        
        const spaces = await res.json();
        // console.log(spaces);
        dispatch(shownSpaces(spaces));
    }
}

export function showSelectedFlatInfo(selectedFlatId: string){
    return async(dispatch:ThunkDispatch)=>{
        const res = await fetch (`${config.BACKEND_URL}/inspector/flats/${selectedFlatId}`)
        
        const selectedFlatInfo = await res.json();
        // console.log(selectedFlatInfo);
        dispatch(shownSelectedFlatInfo(selectedFlatInfo));
    }
}
