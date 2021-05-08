import { User, AuthActions } from "./actions";

export interface AuthState {
    isAuthenticated: boolean | null;
    token: string | null;
    user: User | null;
    error: string | null;
    roleID: number | null;
}

// roleID value 係login success時state update 之時get

const initialState: AuthState = {
    isAuthenticated: null,
    token: null,
    user: null,
    error: null,
    roleID: null
}

export function authReducer (state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case '@@auth/LOGIN_SUCCESS': 
            return {
                ...state,
                isAuthenticated: true,
                token: action.token,
                user: action.user,
                roleID: action.user.role_id 
            }
        case '@@auth/CLEAR_ERROR':
            return {
                ...state,
                error: null
            }
        case '@@auth/LOGIN_FAILED':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
                error: action.error, 
                roleID: null
            }
        case '@@auth/LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: { id: null,
                        username: "",
                        role_id: null
                        },
                roleID: null
            }
        default:
            return state;
    }
}