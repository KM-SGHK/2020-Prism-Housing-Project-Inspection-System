
// OLD RECORD FETCHED FROM DB
export interface IOldRecord {
    correction_due_date?: string
    description: string,
    feature?: string,
    flat_id?: number,
    image?: string,
    inspection_timestamp?: string,
    inspector_name?: string,
    issue?: string,
    record_id?: number,
    space_id?: number,
    defect_id?: number,
    status?: string,
    defectX?: number,
    defectY?: number,
}


export interface IOldRecordState {
    record: IOldRecord[]
}

