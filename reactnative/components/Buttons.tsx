import React from 'react'
import {
    Alert,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteRecord, updateRecord } from '../redux/oldRecords/thunks';
import { postRecord } from '../redux/newRecords/thunks';
import { showFeatureAndDefect } from '../redux/feature/actions';
import { showSpace } from '../redux/space/actions';
import { imagePreviewSwitch } from '../redux/imagePreview/actions';



const SubmitButton = (props: { title: string }) => {

    const navigation = useNavigation();
    const newRecord = useSelector((state: RootState) => state.newRecord);
    const dispatch = useDispatch();
    const IDs = useSelector((state: RootState) => state.idSaving);
    const userId = useSelector((state: RootState) => state.auth.user.id);
    const username = useSelector((state: RootState) => state.auth.user.username);
    const defectX = useSelector((state:RootState)=>state.newRecord.defectX);
    const defectY = useSelector((state:RootState)=>state.newRecord.defectY);
    const selectedFlatId = useSelector((state:RootState)=> state.idSaving.flatId);
    const selectedSpaceId = useSelector((state:RootState)=> state.idSaving.spaceId);

    const alertBeforeSubmit = () =>
        Alert.alert(
        "Confirm Submission?",
        `1 new record to be added by ${username}.`,
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "Submit", onPress: () => {
                console.log(newRecord);
                dispatch(postRecord(newRecord, IDs, userId, defectX, defectY))
                    && setTimeout(() => { 
                        dispatch(showFeatureAndDefect(selectedFlatId, selectedSpaceId)) && 
                        dispatch(showSpace(selectedFlatId)) && 
                        dispatch(imagePreviewSwitch(false)) &&
                        navigation.goBack(); }
                    , 850)
            }}
        ],
        { cancelable: false }
    );

    const alertXYInvalid = () =>
        Alert.alert(
        "Submission Failed!",
        `Please identify the [ Defect Location ].`,
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: () => {
                console.log('OK Pressed.!')
            }}
        ],
        { cancelable: false }
    );


    return (
        <View style={{ backgroundColor: '#ffffff', height: 100, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 1, height: -2 }, shadowRadius: 3.84, shadowColor: 'black', elevation:15, shadowOpacity:0.35 }}>
            <TouchableOpacity
                onPress={
                    defectX >= 0 && defectY >= 0 ? 
                        alertBeforeSubmit
                    :
                        alertXYInvalid
                }
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}


const UpdateButton = (props: { title: string }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const oldRecordState = useSelector((state: RootState) => state.oldRecord);
    const selectedFlatId = useSelector((state:RootState)=> state.idSaving.flatId);
    const selectedSpaceId = useSelector((state:RootState)=> state.idSaving.spaceId);
    const imagePreview = useSelector((state: RootState) => state.imagePreview);

    return (
        <View style={{ backgroundColor: 'transparent', height: 100, width: 600, justifyContent: 'center', alignItems: 'center', left:35}}>
            <TouchableOpacity
                onPress={() => {
                    dispatch(updateRecord(oldRecordState.record[0], imagePreview.status)) && 
                    dispatch(showFeatureAndDefect(selectedFlatId,selectedSpaceId));
                    dispatch(imagePreviewSwitch(false));
                    navigation.goBack();
                }}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}


const DeleteButton = (props: { title: string, recordId: number }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const selectedFlatId = useSelector((state:RootState)=> state.idSaving.flatId);
    const selectedSpaceId = useSelector((state:RootState)=> state.idSaving.spaceId);

    const alertBeforeDelete = () =>
        Alert.alert(
            "Confirm Delete?",
            `You're about to delete (1) record.`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Delete", onPress: () => {
                        dispatch(deleteRecord(props.recordId)) && 
                        setTimeout(()=>{
                            dispatch(showFeatureAndDefect(selectedFlatId, selectedSpaceId)) && 
                            dispatch(showSpace(selectedFlatId)) && 
                            dispatch(imagePreviewSwitch(false)) && 
                            navigation.goBack();
                        }, 100)
                    }
                }
            ],
            { cancelable: false }
        );


    return (
        <View style={{ backgroundColor: 'transparent', height: 100, width: 600, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 10, height: 10 }, shadowColor: 'black', right:35 }}>
            <TouchableOpacity
                onPress={alertBeforeDelete}
                style={styles.deleteButton}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}




export { SubmitButton, UpdateButton, DeleteButton };



// (STYLES BELOW)
const styles = StyleSheet.create({
    buttonContainer: {
        elevation: 8,
        width: '50%',
        backgroundColor: '#466BC9',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    deleteButton: {
        elevation: 8,
        width: '50%',
        backgroundColor: '#C30C0F',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 0,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
})