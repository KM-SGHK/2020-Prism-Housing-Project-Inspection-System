import { IFeature, FeatureActions } from "./actions";

export interface IFeatureAndDefectState {
    result: IFeature[]
}

const FeatureAndDefectInitialState: IFeatureAndDefectState ={
    result: []
}


export function FeatureReducer(state: IFeatureAndDefectState = FeatureAndDefectInitialState, action: FeatureActions): IFeatureAndDefectState {
    switch(action.type){
        case '@@feature/SHOWN_FEATURE_AND_DEFECT':
        return{
            result: action.result
        }
        default:
            return state;
    }
}