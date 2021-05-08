export function selectedFlat(selectedFlatId: string){
    return{
        type: '@@flat/SELECTED_FLAT' as '@@flat/SELECTED_FLAT',
        selectedFlatId: selectedFlatId
    }
}

export function selectedSpace(selectedSpaceId: string){
    return{
        type: '@@flat/SELECTED_SPACE' as '@@flat/SELECTED_SPACE',
        selectedSpaceId: selectedSpaceId
    }
}

export function selectedFeatureAndDefect(selectedFeatureId: string, selectedDefectId: string){
    return{
        type: '@@flat/SELECTED_FEATURE_DEFECT' as '@@flat/SELECTED_FEATURE_DEFECT',
        selectedFeatureId: selectedFeatureId,
        selectedDefectId: selectedDefectId
    }
}


export type IdSavingActions = ReturnType<typeof selectedFlat | typeof selectedSpace| typeof selectedFeatureAndDefect>

