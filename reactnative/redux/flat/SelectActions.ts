import { ThunkDispatch, RootState } from "../../store"

export function selectedTower(selectedTowerValue: string){
    return{
        type: '@@flat/SELECT_TOWER' as '@@flat/SELECT_TOWER',
        selectedTowerValue: selectedTowerValue
    }
}

export function selectedFloor(selectedFloorValue: string){
    return{
        type: '@@flat/SELECT_FLOOR' as '@@flat/SELECT_FLOOR',
        selectedFloorValue : selectedFloorValue
    }
}

export function selectedRoom(selectedRoomValue: string){
    return{
        type: '@@flat/SELECT_ROOM' as '@@flat/SELECT_ROOM',
        selectedRoomValue: selectedRoomValue
    }
}

export function selectedType(selectedTypeValue: string){
    return{
        type: '@@flat/SELECT_TYPE' as '@@flat/SELECT_TYPE',
        selectedTypeValue: selectedTypeValue
    }
}
export type SelectActions = ReturnType<typeof selectedTower | typeof selectedFloor | typeof selectedRoom | typeof selectedType>
