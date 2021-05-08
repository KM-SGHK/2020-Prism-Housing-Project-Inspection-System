import { Dispatch } from 'redux';
import { IOldRecordActions, getRecordSuccess, deleteRecordSuccess, updateRecordSuccess } from './actions';
import { IOldRecord } from './states';
import config from '../../config'
import { IImagePreviewState } from '../imagePreview/states';


export function getRecord(flatId:number, defectId:number) {
    return async (dispatch: Dispatch<IOldRecordActions>) => {
        try{
            let res = await fetch(`${config.BACKEND_URL}/inspector/records/${flatId}/${defectId}`,{
                method:"GET"
            });
            let record = await res.json();
            dispatch(getRecordSuccess(record));
        } catch (err) {
            console.error(err);
        }
    }
}

export function updateRecord(oldRecord:IOldRecord, imagePreviewStatus:boolean){

    return async(dispatch: Dispatch<IOldRecordActions>)=>{
        try {

            const formData = new FormData();
            formData.append('description', oldRecord.description);
            // formData.append('defectX', oldRecord.defectX);
            // formData.append('defectY', oldRecord.defectY);
            
            if (oldRecord.image && imagePreviewStatus) { // Todo: 冇改sketch既record都有舊圖imageUri，但controller既body冇)
                formData.append('image', 
                {
                    uri: oldRecord.image,
                    type: 'image/jpeg',
                    name: `Updated_Image`
                })
            }

            const res = await fetch(`${config.BACKEND_URL}/inspector/records/${oldRecord.record_id}`,{
                method: "PUT",
                // headers: {
                //     "Content-Type": "application/json"
                // },
                body: formData,
            })
            let result = await res.json();
            console.log('UPDATED OLD-RECORD SEND TO BACKEND USING FORMDATA', formData, 'HTTP Response: ', result);

            dispatch(updateRecordSuccess());
        } catch (err) {
            console.error(err);
        }
    }
}

export function deleteRecord(recordId:number){
    return async(dispatch:Dispatch<IOldRecordActions>)=>{
        try {
            const res = await fetch(`${config.BACKEND_URL}/inspector/records/${recordId}`,{
                method:"DELETE"
            });
            const result = await res.json();
            dispatch(deleteRecordSuccess());
        } catch (err) {
            console.log(err);
        }
    }
}