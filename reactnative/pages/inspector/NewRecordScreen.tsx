import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    StatusBar,
    Image,
    GestureResponderEvent,
} from 'react-native';

import RecordInfo from '../../components/RecordInfo';
import Banner from '../../components/Banner';
import ImageDescription from '../../components/ImageDescription';
import { SubmitButton } from '../../components/Buttons';
//@ts-ignore
import Camera from '../../assets/icons/camera.svg';
import EnlargeButton from '../../components/EnlargeButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';

import { useDispatch, useSelector } from 'react-redux';
import { addPhoto, saveTempDefectXY } from '../../redux/newRecords/actions';
import { RootState } from '../../store';
import config from '../../config'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { showFeatureAndDefect } from '../../redux/feature/actions';


const NewRecordScreen = () => {

    const dispatch = useDispatch();
    
    const featureId = useSelector((state: RootState) => state.idSaving.featureId);
    const defectId = useSelector((state: RootState) => state.idSaving.defectId);
    const username = useSelector((state: RootState) => state.auth.user.username);
    const results = useSelector((state: RootState) => state.featuresAndDefects.result);
    const imagePreview = useSelector((state: RootState) => state.imagePreview);
    const newRecordState = useSelector((state: RootState) => state.newRecord);
    
    const [feature, setFeature] = useState<any[]>([]);
    const [defect, setDefect] = useState<any[]>([]);

    useEffect(() => {
        async function getFeature() {
            try {
                let res = await fetch(`${config.BACKEND_URL}/inspector/features/${featureId}`); //Todo: to be amended to 'REACT_APP_API_SERVER/inspector/records/:flatId/:defectId'
                let resJson = await res.json();
                setFeature(resJson);
            } catch (err) {
                console.error(err);
            }
        }

        async function getDefect() {
            try {
                let res = await fetch(`${config.BACKEND_URL}/inspector/defects/${defectId}`); //Todo: to be amended to 'REACT_APP_API_SERVER/inspector/records/:flatId/:defectId'
                let resJson = await res.json();
                setDefect(resJson);
            } catch (err) {
                console.error(err);
            }
        }

        dispatch(saveTempDefectXY(-100,-100));

        getFeature();
        getDefect();

        console.log('========')
        console.log(imagePreview);
        console.log('========')

    }, []);


    // --- (IMAGE PICKER) ---
    const options = {
        title: 'Upload Defect Image',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        allowsEditing: true,
    };
    const [imageSource, setImageSource] = useState<any>({});
    const [preview, setPreview] = useState<boolean>(false);


    const scrollToBottom = () => {
        this.scrollView.scrollToEnd();
    }


    return (
        <>
            <StatusBar barStyle="dark-content" animated={true}/>

            <View 
                style={{ backgroundColor: '#000000', height: '35%', justifyContent: 'center', alignItems: 'center' }}>
                {
                    preview == false ?
                        <Camera
                            height={'45%'} width={'45%'} fill="white"
                            onPress={(event: GestureResponderEvent) => {
                                ImagePicker.showImagePicker(options, (response) => {
                                    if (response.didCancel) {
                                        console.log('User cancelled image picker');
                                    } else if (response.error) {
                                        console.log('ImagePicker Error: ', response.error);
                                    } else if (response.customButton) {
                                        console.log('User tapped custom button: ', response.customButton);
                                    } else {
                                        const source = { uri: response.uri };
                                        // Todo: get imageUri (with sketch) from redux and preview
                                        setImageSource(source);
                                        dispatch(addPhoto(source.uri));
                                        setPreview(true); //upload相後變成有得preview local image
                                        console.log(source);
                                    }
                                })
                            }} />
                    :
                        <>
                            <Image
                                style={{ flex: 1, width: '100%', resizeMode: "contain" }}
                                source={
                                    imagePreview.status ?
                                        { uri: newRecordState.imageURL }
                                    :
                                        imageSource
                                }
                            />
                            <EnlargeButton/>
                        </>
                    }
            </View>

            <ScrollView 
                ref={(scrollView) => { this.scrollView = scrollView }}>

                <RecordInfo 
                    date={(new Date().toLocaleDateString())}
                    time={(new Date().toLocaleTimeString())}
                    inspector={username}
                />
                <Banner 
                    feature={(feature?.[0]?.feature.toString())}
                    defect={(defect?.[0]?.issue.toString())}
                    defectX={-100}
                    defectY={-100}
                />
                <ImageDescription description="" actionWhenFocused={scrollToBottom}/>

            </ScrollView>

            <SubmitButton title="Submit"/>
        </>
    )
}

export default NewRecordScreen;



const styles = StyleSheet.create({
    keyboardContainer: {
      flex: 1
    },
  });
  