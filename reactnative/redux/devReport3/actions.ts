import { ThunkDispatch, RootState } from "../../store"
import config from "../../config"

export interface DefectStatusByFlatType {
    Flat1NotSoSerious: number,
    Flat1Moderate: number,
    Flat1Serious: number,

    Flat2NotSoSerious: number,
    Flat2Moderate: number,
    Flat2Serious: number,

    Flat3NotSoSerious: number,
    Flat3Moderate: number,
    Flat3Serious: number,

    Flat4NotSoSerious: number,
    Flat4Moderate: number,
    Flat4Serious: number,

    // isLoading: boolean
}

export function loadDevReport3(
    Flat1NotSoSerious: number,
    Flat1Moderate: number,
    Flat1Serious: number,

    Flat2NotSoSerious: number,
    Flat2Moderate: number,
    Flat2Serious: number,

    Flat3NotSoSerious: number,
    Flat3Moderate: number,
    Flat3Serious: number,

    Flat4NotSoSerious: number,
    Flat4Moderate: number,
    Flat4Serious: number,

    // isLoading: boolean
) {
    return {
        type: '@@devReport3/GETREPORT3_SUCCESS' as '@@devReport3/GETREPORT3_SUCCESS',
        Flat1NotSoSerious,
        Flat1Moderate,
        Flat1Serious,

        Flat2NotSoSerious,
        Flat2Moderate,
        Flat2Serious,

        Flat3NotSoSerious,
        Flat3Moderate,
        Flat3Serious,

        Flat4NotSoSerious,
        Flat4Moderate,
        Flat4Serious,

        // isLoading,
    }
}

export type IdevReport3Actions = ReturnType<typeof loadDevReport3>

// thunk



export function getDevReport3() {
    return async (dispatch: ThunkDispatch, getState: () => RootState) => {
        // dispatch(loading());
        console.log('Before try')
        try {
            console.log('try')
            const res = await fetch(`${config.BACKEND_URL}/reports_type1FlatDefectsRN`)
            console.log("res",res)
            // let isLoading=true
            const json = await res.json();
            console.log('JSON',json)
            if (res.status === 200) {
                return dispatch(loadDevReport3(
                    json.Flat1NotSoSerious,
                    json.Flat1Moderate,
                    json.Flat1Serious,

                    json.Flat2NotSoSerious,
                    json.Flat2Moderate,
                    json.Flat2Serious,

                    json.Flat3NotSoSerious,
                    json.Flat3Moderate,
                    json.Flat3Serious,

                    json.Flat4NotSoSerious,
                    json.Flat4Moderate,
                    json.Flat4Serious,

                    // !isLoading
                ));
            }
    
            // const returnPath = (getState().router.location.state as any)?.from

         
            // dispatch(loginSuccess(json.token, json.user));
            // // dispatch(push(returnPath || '/'))
        } catch (e) {
            console.log("catch")
            console.error(e);
            
        } finally {
            // dispatch(finishLoading())
        }
    }
}
