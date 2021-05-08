import { OverallUrgency, IdevReport1Actions } from "./actions";

export interface IdevReport1State{
    type1: number | 0;
    type2: number | 0;
    type3: number | 0;
}

const initialState: IdevReport1State={
    type1:23, 
    type2:15,
    type3:22
}

export function devReport1Reducer(state: IdevReport1State = initialState, action: IdevReport1Actions): IdevReport1State {
    switch(action.type){
        case '@@devReport1/GETREPORT1_SUCCESS':
            return{
                ...state,
                type1: action.type1,
                type2: action.type2,
                type3: action.type3
            }
        default:
            return state;
    }
   
}