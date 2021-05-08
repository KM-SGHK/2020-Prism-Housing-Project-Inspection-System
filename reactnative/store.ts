import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk, {ThunkDispatch as OldThunkDispatch} from 'redux-thunk';
import { AuthState, authReducer } from "./redux/auth/reducer";
import { AuthActions } from "./redux/auth/actions";
import { IFlatAllState, SearchReducer, SelectReducer, ISelectState, IFlatTableState, TableReducer, IIdSavingState, IdSavingReducer} from "./redux/flat/reducer";
import { SearchActions } from "./redux/flat/SearchActions";
import { SelectActions } from "./redux/flat/SelectActions";
import { IdSavingActions } from "./redux/flat/IdSavingActions";
import { ISelectedSpaceState, SpaceReducer } from "./redux/space/reducers";
import { SpaceActions } from "./redux/space/actions";
import { IFeatureAndDefectState, FeatureReducer } from "./redux/feature/reducers";
import { FeatureActions } from "./redux/feature/actions";
import { IdevReport1State, devReport1Reducer } from "./redux/devReport1/reducer";
import { IdevReport1Actions } from "./redux/devReport1/actions";
import { IdevReport2State, devReport2Reducer } from "./redux/devReport2/reducer";
import { IdevReport2Actions } from "./redux/devReport2/actions";
import { IdevReport3State, devReport3Reducer } from "./redux/devReport3/reducer";
import { IdevReport3Actions } from "./redux/devReport3/actions";
import logger from 'redux-logger';

import { IOldRecordState } from "./redux/oldRecords/states"
import { IOldRecordActions } from "./redux/oldRecords/actions";
import { oldRecordReducers } from "./redux/oldRecords/reducers";
import { INewRecordState } from "./redux/newRecords/states";
import { INewRecordActions } from "./redux/newRecords/actions";
import { newRecordReducers } from "./redux/newRecords/reducers";
import { IImagePreviewState } from "./redux/imagePreview/states";
import { IImagePreviewActions } from "./redux/imagePreview/actions";
import { imagePreviewReducers } from "./redux/imagePreview/reducers";

// 1. be aware of the ./

export interface RootState {
  auth: AuthState;
  search: IFlatAllState;
  select: ISelectState;
  flatTable: IFlatTableState;
  idSaving: IIdSavingState;
  spaces: ISelectedSpaceState;
  featuresAndDefects: IFeatureAndDefectState;
  devReport1: IdevReport1State;
  devReport2: IdevReport2State;
  devReport3: IdevReport3State;
  oldRecord: IOldRecordState;
  newRecord: INewRecordState;
  imagePreview: IImagePreviewState;
}

export type RootActions = AuthActions | 
                          SearchActions | 
                          SelectActions | 
                          IdSavingActions | 
                          SpaceActions | 
                          FeatureActions | 
                          IdevReport1Actions | 
                          IdevReport2Actions | 
                          IdevReport3Actions | 
                          IOldRecordActions | 
                          INewRecordActions |
                          IImagePreviewActions;

// type to be defined in reducer. Need import, see above (AuthState, authReducer)
const rootReducer = combineReducers({
  auth: authReducer,
  search: SearchReducer,
  select: SelectReducer,
  flatTable: TableReducer,
  idSaving: IdSavingReducer,
  spaces: SpaceReducer,
  featuresAndDefects: FeatureReducer,
  devReport1: devReport1Reducer,
  devReport2: devReport2Reducer,
  devReport3: devReport3Reducer,
  oldRecord: oldRecordReducers,
  newRecord: newRecordReducers,
  imagePreview: imagePreviewReducers,
})

export type ThunkDispatch = OldThunkDispatch<RootState, null, RootActions>

declare global{
    /* tslint:disable:interface-name */
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any
    }
}

//@ts-ignore
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore<RootState, RootActions, {}, {}>(
  rootReducer, 
  compose(
    applyMiddleware(thunk),
    // applyMiddleware(logger)
))
