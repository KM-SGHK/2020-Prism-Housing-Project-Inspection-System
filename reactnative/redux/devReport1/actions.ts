import { ThunkDispatch, RootState } from "../../store"
import config from "../../config"



// interface should be the same as the backend table (refer to AuthController.ts)
export interface OverallUrgency {
    type1: number;
    type2: number;
    type3: number;
}

export function loadDevReport1(type1: number, type2: number, type3: number) {
    return {
        type: '@@devReport1/GETREPORT1_SUCCESS' as '@@devReport1/GETREPORT1_SUCCESS',
        type1,
        type2, 
        type3
    }
}



export type IdevReport1Actions  = ReturnType<typeof loadDevReport1>

// thunk



export function getDevReport1() {
    return async (dispatch: ThunkDispatch, getState: () => RootState) => {
        // dispatch(loading());
        try {
            const res = await fetch(`${config.BACKEND_URL}/reports`)
        
            const json = await res.json();
            console.log("1",json.type1)
            if (res.status === 200) {
                return dispatch(loadDevReport1(json.type1, json.type2, json.type3));
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


