import { DefectStatusByFlatType, IdevReport3Actions } from "./actions";

export interface IdevReport3State {
    Flat1NotSoSerious: number ;
    Flat1Moderate: number;
    Flat1Serious: number;

    Flat2NotSoSerious: number;
    Flat2Moderate: number;
    Flat2Serious: number;

    Flat3NotSoSerious: number;
    Flat3Moderate: number;
    Flat3Serious: number;

    Flat4NotSoSerious: number;
    Flat4Moderate: number;
    Flat4Serious: number;

    isLoading: true | false;
}

const initialState: IdevReport3State={
    Flat1NotSoSerious: 1,
    Flat1Moderate:1, 
    Flat1Serious: 1,

    Flat2NotSoSerious: 1,
    Flat2Moderate: 1,
    Flat2Serious: 1,

    Flat3NotSoSerious: 1,
    Flat3Moderate: 1,
    Flat3Serious: 1,

    Flat4NotSoSerious: 1,
    Flat4Moderate: 1,
    Flat4Serious: 1,

    // isLoading: true
}

export function devReport3Reducer(state: IdevReport3State = initialState, action: IdevReport3Actions): IdevReport3State {
    switch(action.type){
        case '@@devReport3/GETREPORT3_SUCCESS':
            return{
                ...state,
                Flat1NotSoSerious: action.Flat1NotSoSerious,
                Flat1Moderate:action.Flat1Moderate, 
                Flat1Serious: action.Flat1Serious,
            
                Flat2NotSoSerious: action.Flat2NotSoSerious,
                Flat2Moderate: action.Flat2Moderate,
                Flat2Serious: action.Flat2Serious,
            
                Flat3NotSoSerious: action.Flat3NotSoSerious,
                Flat3Moderate: action.Flat3Moderate,
                Flat3Serious: action.Flat3Serious,
            
                Flat4NotSoSerious: action.Flat4NotSoSerious,
                Flat4Moderate: action.Flat4Moderate,
                Flat4Serious: action.Flat4Serious,

                // isLoading: false,
            }
        default:
            return state;
    }
   
}
