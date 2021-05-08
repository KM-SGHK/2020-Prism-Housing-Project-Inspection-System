import { ThunkDispatch, RootState } from "../../store"
import config from "../../config"

export interface InspectionByFlatType {
    flatType1: number;
    flatType2: number;
    flatType3: number;
    flatType4: number; 
}

export function loadDevReport2(flatType1: number, flatType2: number, flatType3: number, flatType4: number) {
    return {
        type: '@@devReport2/GETREPORT2_SUCCESS' as '@@devReport2/GETREPORT2_SUCCESS',
        flatType1,
        flatType2, 
        flatType3,
        flatType4
    }
}

export type IdevReport2Actions  = ReturnType<typeof loadDevReport2>

// thunk



export function getDevReport2() {
    return async (dispatch: ThunkDispatch, getState: () => RootState) => {
        // dispatch(loading());
        try {
            const res = await fetch(`${config.BACKEND_URL}/reports_defectsbyFlatType`)
        
            const json = await res.json();
            console.log(json)
            if (res.status === 200) {
                return dispatch(loadDevReport2(parseInt(json.flatType0), parseInt(json.flatType1), parseInt(json.flatType2), parseInt(json.flatType3)));
            }
    
         

            // const returnPath = (getState().router.location.state as any)?.from

         
            // dispatch(loginSuccess(json.token, json.user));
            // // dispatch(push(returnPath || '/'))
        } catch (e) {
            console.error(e);
            
        } finally {
            // dispatch(finishLoading())
        }
    }
}
