import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
} from 'react-native';

import config from '../../config'
import RecordInfo from '../../components/RecordInfo'
import Banner from '../../components/Banner'
import ImageDescription from '../../components/ImageDescription'
import { UpdateButton, DeleteButton } from '../../components/Buttons'
import EnlargeButton from '../../components/EnlargeButton'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { getRecord } from '../../redux/oldRecords/thunks';
import { saveTempDefectXY } from '../../redux/newRecords/actions';


const OldRecordScreen = () => {
    console.log('--OldRecordPage--')

    const dispatch = useDispatch();
    const flatId = useSelector((state: RootState) => state.idSaving.flatId);
    const defectId = useSelector((state: RootState) => state.idSaving.defectId);
    const record = useSelector((state: RootState) => state.oldRecord.record);
    const imagePreview = useSelector((state: RootState) => state.imagePreview);
    
    useEffect(()=>{
        dispatch(getRecord(parseInt(flatId), parseInt(defectId)));
        dispatch(saveTempDefectXY(-100,-100));
        console.log('===============');
        console.log(imagePreview);
        console.log('===============');
    },[]);
    //dispatch, flatId, defectId
    
    let recordArr = record.slice(); // Record Array fetched from DB

    console.log(recordArr?.[0]?.image);

    const scrollToBottom = () => {
        this.scrollView.scrollToEnd();
    }


    return (
        <>
            <StatusBar barStyle="dark-content" animated={true}/>

            <View style={{ backgroundColor: '#000000', height: '35%' }}>
                <Image style={{flex: 1, width: '100%', resizeMode:"contain"}}
                    // Todo: 第一次load 係dB攞野，之後全部係redux store拎
                    source = {
                        imagePreview.status ?
                            { uri: recordArr?.[0]?.image }
                        :
                            { uri: `${config.BACKEND_URL}/inspector/records/${flatId}/${defectId}/image`}
                    }
                        //! Can't use URL fetched from DB?? Static vs Dynamic image?
                        //? https://stackoverflow.com/questions/30854232/react-native-image-require-module-using-dynamic-names
                        //? fetch image from DB using ExpressJS: https://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express
                />
                { recordArr?.[0]?.image && <EnlargeButton/> }
            </View>

            <ScrollView
                ref={(scrollView) => { this.scrollView = scrollView }}>
        
                <RecordInfo 
                    date={recordArr?.[0]?.inspection_timestamp.slice(0,10)}
                    time={recordArr?.[0]?.inspection_timestamp.slice(11,16)}
                    inspector={recordArr?.[0]?.inspector_name}
                />
                
                <Banner 
                    feature={recordArr?.[0]?.feature}
                    defect={recordArr?.[0]?.issue}
                    defectX={recordArr?.[0]?.defectX}
                    defectY={recordArr?.[0]?.defectY}
                />
                
                <ImageDescription description={recordArr?.[0]?.description} actionWhenFocused={scrollToBottom}/>
            
            </ScrollView>
            
            <View style={styles.footer}>
                <UpdateButton title="Update" />
                <DeleteButton title="Delete" recordId={recordArr?.[0]?.record_id}/>
            </View>
        </>
    )
}

export default OldRecordScreen;


const styles = StyleSheet.create({
    footer:{
        height:100,
        flex:1, 
        flexDirection:'row', 
        justifyContent:'space-evenly', 
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: -2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 15,
        position: 'absolute',
        bottom: 0,
    }
})