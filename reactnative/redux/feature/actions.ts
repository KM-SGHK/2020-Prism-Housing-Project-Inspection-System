import { ThunkDispatch, RootState } from "../../store"
import config from "../../config"

export interface IFeature{
    feature_id : number;
    feature : string;
    defects:[
        {    
        defect_id: number;
        issue : string;
        hasRec : boolean;
        }
    ]
}

export function shownFeatureAndDefect(result: IFeature[]){
    return{
        type: "@@feature/SHOWN_FEATURE_AND_DEFECT" as "@@feature/SHOWN_FEATURE_AND_DEFECT",
        result: result
    }
}

export type FeatureActions = ReturnType<typeof shownFeatureAndDefect>

export function showFeatureAndDefect(selectedFlatId: string, selectedSpaceId:string){
    return async(dispatch:ThunkDispatch)=>{
        const res = await fetch (`${config.BACKEND_URL}/inspectorV2/flats/${selectedFlatId}/spaces/${selectedSpaceId}`)
        
        const result = await res.json();
        dispatch(shownFeatureAndDefect(result));
    }
}