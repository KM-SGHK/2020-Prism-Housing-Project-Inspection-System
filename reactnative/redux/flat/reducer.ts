import { SelectActions } from "./SelectActions";
import { SearchActions, ITower, IFloor, IRoom, IType, IFlat } from "./SearchActions";
import { IdSavingActions } from "./IdSavingActions";

//Render dropdown selections from DB
export interface IFlatAllState {
    tableData: [{}] | null;
    towerValues: ITower[] | null;
    floorValues: IFloor[] | null;
    roomValues: IRoom[] | null;
    typeValues: IType[] | null;
}

const DropDownInitialState: IFlatAllState = {
    tableData: [{}],
    towerValues: [],
    floorValues: [],
    roomValues: [],
    typeValues: []
}

export function SearchReducer(state: IFlatAllState = DropDownInitialState, action: SearchActions): IFlatAllState {
    switch (action.type) {
        case '@@flat/SHOWN_TOWER_ALL':
            return {
                ...state,
                towerValues: action.tower,
            }
        case '@@flat/SHOWN_FLOOR_ALL':
            return {
                ...state,
                floorValues: action.floor,
            }
        case '@@flat/SHOWN_ROOM_ALL':
            return {
                ...state,
                roomValues: action.room,
            }
        case '@@flat/SHOWN_TYPE_ALL':
            return {
                ...state,
                typeValues: action.rType,
            }
        default:
            return state;
    }
}



//Save selected Value for Searching
export interface ISelectState {
    selectedTowerValue: string,
    selectedFloorValue: string,
    selectedRoomValue: string,
    selectedTypeValue: string,
}

const SelectInitialState: ISelectState = {
    selectedTowerValue: '',
    selectedFloorValue: '',
    selectedRoomValue: '',
    selectedTypeValue: '',
}

export function SelectReducer(state: ISelectState = SelectInitialState, action: SelectActions): ISelectState {
    switch (action.type) {
        case '@@flat/SELECT_TOWER':
            return {
                ...state,
                selectedTowerValue: action.selectedTowerValue,
            }
        case '@@flat/SELECT_FLOOR':
            return {
                ...state,
                selectedFloorValue: action.selectedFloorValue,
            }
        case '@@flat/SELECT_ROOM':
            return {
                ...state,
                selectedRoomValue: action.selectedRoomValue,
            }
        case '@@flat/SELECT_TYPE':
            return {
                ...state,
                selectedTypeValue: action.selectedTypeValue,
            }
        default:
            return state;
    }
}

export interface IFlatTableState {
    result: IFlat[]
}

const FlatTableInitialState: IFlatTableState ={
    result: []
}

export function TableReducer(state: IFlatTableState = FlatTableInitialState, action: SearchActions): IFlatTableState {
    switch(action.type){
        case '@@flat/SHOWN_FLAT_ALL':
        return{
            result: action.flat
        }
        default:
            return state;
    }
}

export interface IIdSavingState {
    flatId: string,
    spaceId: string,
    featureId: string,
    defectId: string 
}

const IdSavingInitialState: IIdSavingState ={
    flatId: "",
    spaceId: "",
    featureId: "",
    defectId: ""
}

export function IdSavingReducer(state: IIdSavingState = IdSavingInitialState, action: IdSavingActions): IIdSavingState{
    switch(action.type){
        case '@@flat/SELECTED_FLAT':
            return{
                flatId: action.selectedFlatId,
                spaceId: "",
                featureId: "",
                defectId: ""
            }
        case '@@flat/SELECTED_SPACE':
            return{
                ...state,
                spaceId: action.selectedSpaceId,
                featureId: "",
                defectId: ""
            }
        case '@@flat/SELECTED_FEATURE_DEFECT':
            return{
                ...state,
                featureId: action.selectedFeatureId,
                defectId: action.selectedDefectId
            }
            default:
                return state;
    }
}