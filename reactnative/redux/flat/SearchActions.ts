import { ThunkDispatch, RootState } from "../../store"
import config from "../../config"
// import { AsyncStorage } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { useSelector } from "react-redux"

export interface ITower{
    tower: string;
}

export interface IFloor{
    floor: string;
}

export interface IRoom{
    id: number;
    room: string;
}

export interface IType{
    id: number;
    type: string;
}

export interface IFlat{
    id: number;
    room: string;
    floor: string;
    tower: string;
    size_in_sq_ft: number;
    floorplan: string;
    target_completion_date: Date;
    last_modified_date: Date;
    defects_total: string;
}

export function shownTowerAll(towers: ITower[]){
    return{
        type: '@@flat/SHOWN_TOWER_ALL' as '@@flat/SHOWN_TOWER_ALL',
        tower: towers
    }
}

export function shownFloorAll(floors: IFloor[]){
    return{
        type: '@@flat/SHOWN_FLOOR_ALL' as '@@flat/SHOWN_FLOOR_ALL',
        floor: floors
    }
}

export function shownRoomAll(rooms: IRoom[]){
    return{
        type: '@@flat/SHOWN_ROOM_ALL' as '@@flat/SHOWN_ROOM_ALL',
        room: rooms
    }
}

export function shownTypeAll(types: IType[]){
    return{
        type: '@@flat/SHOWN_TYPE_ALL' as '@@flat/SHOWN_TYPE_ALL',
        rType: types
    }
}

export function shownFlatAll (flats: IFlat[]){
    return{
        type: '@@flat/SHOWN_FLAT_ALL' as '@@flat/SHOWN_FLAT_ALL',
        flat: flats,
    }
}

export type SearchActions = ReturnType<typeof shownTowerAll | typeof shownFloorAll | typeof shownRoomAll | typeof shownTypeAll | typeof shownFlatAll>


export function showTowerAll(){
    return async(dispatch:ThunkDispatch) =>{
        const res = await fetch(`${config.BACKEND_URL}/towers`)

        const towers = await res.json();
        dispatch(shownTowerAll(towers));
    }
}

export function showFloorAll(){
    return async(dispatch:ThunkDispatch) =>{
        const res = await fetch(`${config.BACKEND_URL}/floors`)

        const floors = await res.json();
        dispatch(shownFloorAll(floors));
    }
}

export function showRoomAll(){
    return async(dispatch:ThunkDispatch) =>{
        const res = await fetch(`${config.BACKEND_URL}/rooms`)

        const rooms = await res.json();
        dispatch(shownRoomAll(rooms));
    }
}

export function showTypeAll(){
    return async(dispatch:ThunkDispatch) =>{
        const res = await fetch(`${config.BACKEND_URL}/types`)

        const types = await res.json();
        dispatch(shownTypeAll(types));
    }
}




export function showFlatAll(selectedTowerValue,selectedFloorValue,selectedRoomValue,selectedTypeValue){

    return async(dispatch:ThunkDispatch)=>{
        const res = await fetch (`${config.BACKEND_URL}/flats/?tower=${selectedTowerValue}&floor=${selectedFloorValue}&room=${selectedRoomValue}&type=${selectedTypeValue}`)
        
        const flats = await res.json();
        dispatch(shownFlatAll(flats));
    }
}
