import { InspectionByFlatType, IdevReport2Actions } from "./actions";

export interface IdevReport2State{
    flatType1: number | 0;
    flatType2: number | 0;
    flatType3: number | 0;
    flatType4: number | 0;
}

const initialState: IdevReport2State={
    flatType1:0, 
    flatType2:0, 
    flatType3:0, 
    flatType4:0, 
}


export function devReport2Reducer(state: IdevReport2State = initialState, action: IdevReport2Actions): IdevReport2State {
    switch(action.type){
        case '@@devReport2/GETREPORT2_SUCCESS':
            return{
                ...state,
                flatType1:action.flatType1, 
                flatType2:action.flatType2, 
                flatType3:action.flatType3, 
                flatType4:action.flatType4, 
            }
        default:
            return state;
    }
   
}