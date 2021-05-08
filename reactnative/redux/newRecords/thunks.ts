import { Dispatch } from 'redux';
import { INewRecordActions, postRecordSuccess } from './actions';
import { INewRecordState } from './states';
import { IIdSavingState } from '../flat/reducer';
import config from '../../config'


export function postRecord(newRecord:INewRecordState, IDs:IIdSavingState, userId:number, defectX: number, defectY: number){

    console.log(newRecord)
    console.log(IDs)

    return async (dispatch: Dispatch<INewRecordActions>)=>{
        try {
            const formData = new FormData();
            formData.append('description', newRecord.description);

            formData.append('status', 'fixing'); // Todo: to be replaced by progress checklist logic

            if (newRecord.imageURL) {
                
                formData.append('image', 
                {
                    uri: newRecord.imageURL,
                    type: 'image/jpeg',
                    name: `Image`
                })
            }

            formData.append('flat_id', IDs.flatId);
            formData.append('space_id', IDs.spaceId);
            formData.append('defect_id', IDs.defectId);
            formData.append('user_id', userId);
            // formData.append('defectX', defectX);
            // formData.append('defectY',defectY);

            let res = await fetch(`${config.BACKEND_URL}/newRecords`,{
                method: "POST",
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                // body: JSON.stringify(formData),
                body: formData
            });
            const result = await res.json();
            console.log(result);
            
            dispatch(postRecordSuccess(newRecord as INewRecordState));
``
        } catch (err) {
            console.error(err);
        }
    }
}