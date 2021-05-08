import React, { useState, useEffect } from 'react'
import {
    View,
    TextInput,
    StyleSheet,
  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editDescription } from '../redux/newRecords/actions';
import { editOldDescription } from '../redux/oldRecords/actions';
import { RootState } from '../store';
  


const ImageDescription = (props:{description:string, actionWhenFocused:any}) => {

    const [value, setValue] = useState<string>(props.description);
    
    const dispatch = useDispatch();
    const defectId = useSelector((state: RootState) => state.idSaving.defectId);
    const featureId = useSelector((state: RootState) => state.idSaving.featureId);
    const results = useSelector((state: RootState) => state.featuresAndDefects.result);
    const description = useSelector((state: RootState) => state.oldRecord.record?.[0]?.description);
    const hasRecord = results.filter(elem => elem.feature_id == parseInt(featureId))[0].defects.filter(elem => elem.defect_id == parseInt(defectId))[0].hasRec

    const [keyboardOut, setKeyboardOut] = useState(false);

    useEffect(()=>{
        if(keyboardOut == true){
            props.actionWhenFocused();
        }
    }, [keyboardOut])



    return (
        <>
            <View style={{height:240 , backgroundColor:'#fff', alignItems:'center'}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="圖片描述"
                    placeholderTextColor='grey'
                    multiline={true}
                    editable={true}
                    numberOfLines={5}
                    onChangeText={text => {
                        setValue(text);

                        { hasRecord ? 
                            dispatch(editOldDescription(text))
                        : 
                            dispatch(editDescription(text)) 
                        }
                        
                    }}
                    // value={value == undefined ? `${props.description}` : value}
                    value={hasRecord ? `${description}` : value}
                    
                    onFocus={() => {
                        setKeyboardOut(!keyboardOut)
                    }}

                    onBlur={() => {
                        setKeyboardOut(!keyboardOut)
                    }}

                ></TextInput>
            </View>

            {keyboardOut && <View style={{height:264}}></View>}

        </>
    )
}

export default ImageDescription;


const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
        padding: 16,
        lineHeight: 24,
        flex: 1,
        textAlignVertical: 'top',
        marginTop: 20,
        height: 90,
        width: '90%',
        borderColor: '#0f0f0f',
        borderWidth: 2,
        borderRadius: 10,
    }
})