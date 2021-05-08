import { ThunkDispatch, RootState } from "../../store"
import config from "../../config"
// import { AsyncStorage } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"


// interface should be the same as the backend table (refer to AuthController.ts)
export interface User {
    id: number;
    username: string;
    role_id: number;
}

export function loginSuccess(token: string, user: User) {
    return {
        type: '@@auth/LOGIN_SUCCESS' as '@@auth/LOGIN_SUCCESS',
        token,
        user
    }
}

export function loginFailed(error: string) {
    return {
        type: '@@auth/LOGIN_FAILED' as '@@auth/LOGIN_FAILED',
        error
    }
}

export function logoutSuccess() {
    return {
        type: '@@auth/LOGOUT' as '@@auth/LOGOUT'
    }
}
export function clearError() {
    return {
        type: '@@auth/CLEAR_ERROR' as '@@auth/CLEAR_ERROR',
    }
}


export type AuthActions = ReturnType<typeof loginSuccess | typeof loginFailed | typeof logoutSuccess | typeof clearError>

// thunk

export function logout() {
    return async (dispatch: ThunkDispatch, getState: () => RootState) => {
        await AsyncStorage.removeItem('token')
        dispatch(logoutSuccess())
    };
}

export function login(username: string, password: string) {
    return async (dispatch: ThunkDispatch, getState: () => RootState) => {
        // dispatch(loading());
        try {
            const res = await fetch(`${config.BACKEND_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, password
                })
            })

            const json = await res.json();
            console.log(json)
            if (res.status != 200) {
                return dispatch(loginFailed(json.error));
            }
    
            if (!json.token) {
                return dispatch(loginFailed('Network error'));
            }

            // const returnPath = (getState().router.location.state as any)?.from

            await AsyncStorage.setItem('token', json.token);
            dispatch(loginSuccess(json.token, json.user));
            // dispatch(push(returnPath || '/'))
        } catch (e) {
            console.error(e);
            dispatch(loginFailed('Unknown error'));
        } finally {
            // dispatch(finishLoading())
        }
    }
}


export function restoreLogin() {
    return async (dispatch: ThunkDispatch, getState: () => RootState) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token == null) {
                dispatch(logout());
                return;
            }
            const res = await fetch(`${config.BACKEND_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const json = await res.json();

            if (json.id) {
                dispatch(loginSuccess(token, json))
            } else {
                dispatch(logout());
            }
        } catch (e) {
            console.error(e);
            dispatch(logout());
        }
    }
}