export interface IUser {
    id: number;
    username: string;
    password: string;
    role_id: number;
}

export interface ITower{
    id: number;
    tower: string;
}

export interface IFloor{
    id: number;
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

export interface Iflat{
    id: number;
    room: string;
    floor: string;
    tower: string;
    size_in_sq_ft: number;
    type: string;
    floorplan: Text;
    is_inspected: boolean;
    target_completion_date: Date;
}

export interface Ispace{
    id: number;
    space: string;
    flat_id: number;
}

export interface IFeature{
    id: number;
    feature: string;
    space_id: number;
    subcontractor_id: number;
}

export interface IDefect{
    id: number;
    issue: string
    feature_id: number;
}

export interface IRecord{
    description: Text;
    status: string;
    flat_id: number;
    defect_id: number;
    // correction_due_date: Date;
    filename?: string;
    user_inspector_id: number;
    defectX: number;
    defectY: number;
}