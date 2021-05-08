import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    Alert,
    StatusBar,
} from 'react-native';
//@ts-ignore
import BackButton from '../../assets/icons/arrow-left.svg'
//@ts-ignore
import DownloadIcon from '../../assets/icons/download.svg';
//@ts-ignore
import PenIcon from '../../assets/icons/pen-square.svg';
//@ts-ignore
import CloseIcon from '../../assets/icons/times.svg';
//@ts-ignore
import Circle from '../../assets/icons/circle.svg'
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import CameraRoll from "@react-native-community/cameraroll";
import ViewShot from "react-native-view-shot";
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { saveEditedImage } from '../../redux/oldRecords/actions';
import { saveEditedNewImage } from '../../redux/newRecords/actions'
import { imagePreviewSwitch } from '../../redux/imagePreview/actions';



const ImageModal = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const newRecordState = useSelector((state: RootState) => state.newRecord);
  const oldRecordImageUri_REDUX = useSelector((state: RootState) => state.oldRecord.record?.[0]?.image);
  const flatId = useSelector((state: RootState) => state.idSaving.flatId);
  const featureId = useSelector((state: RootState) => state.idSaving.featureId);
  const defectId = useSelector((state: RootState) => state.idSaving.defectId);
  const results = useSelector((state: RootState) => state.featuresAndDefects.result);
  const hasRecord = results.filter(elem => elem.feature_id == parseInt(featureId))[0].defects.filter(elem => elem.defect_id == parseInt(defectId))[0].hasRec
  const imagePreview = useSelector((state: RootState) => state.imagePreview)

  const [undoChange, setUndoChange] = useState(false);
  const [clearChange, setClearChange] = useState(false);

  const [sketchView, setSketchView] = useState(false);
  const [activeColor, setActiveColor] = useState<'red'|'blue'|'yellow'>('red')

  useEffect(()=>{
    this.canvas.undo();
  }, [undoChange]);
  useEffect(()=>{
    this.canvas.clear();
  }, [clearChange]);
  
  // Save and retrieve sketch logic
    // Todo: (1) ScreenCap低ViewShot包住的layers [ image + sketch ]
    // Todo: (2) save低張相落camera roll
    // Todo: (3) update record (PUT) when press UPDATE button

  // useStateHook 點解唔用得async-await?
    //? const captureViewShot = async () => {
    //?   const uri = await this.viewShot.capture();
    //?   await saveCapturedViewShot(uri);
    //?   await setCapturedImageUri(uri);
    //? }

  const saveViewShot = () => {
    this.viewShot.capture()
      .then((uri: string) => {
        console.log('-----ViewShot-----')
        console.log(uri);
        if (hasRecord) {
          dispatch(saveEditedImage(uri));
          console.log('save action dispatched to OLD RECORD !!!');
          dispatch(imagePreviewSwitch(true));
        } else {
          // Todo: dispatch to newRecordState image...
          dispatch(saveEditedNewImage(uri));
          console.log('save action dispatched to NEW RECORD !!!')
          dispatch(imagePreviewSwitch(true));
        }
      })
      .catch((err: any) => {
        console.error(err);
    })
  }

  const downloadViewShot = () => {
    this.viewShot.capture()
      .then((uri: string) => {
        CameraRoll.save(uri);
        return uri   
      })
      .then(()=>{
        alertAfterSave('Image Saved', 'Record image saved to camera roll.');
      })
      .catch((err: any) => {
        console.error(err);
        alertAfterSave('Save Error', 'Please try again.');
      })
  }

  const alertAfterSave = async (title: string, message: string) => 
      Alert.alert(
      title,
      message,
      [
          { text: "OK" }
      ],
        { cancelable: false }
    );
  

  return (
    <>
      <StatusBar animated={true} />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>

          <ViewShot 
            ref={ref => this.viewShot = ref}
            options={{ format: "jpg", quality: 0.9 }}
            style={{height:'100%', width:'100%'}}>

            <View style={{height:'100%', width:'100%', position:'relative'}}>
              <Image style={{flex:1, width: '100%', resizeMode:"cover"}}
                // Todo: set page specific img source using redux state
                source={
                  hasRecord ? 
                    (
                      imagePreview.status ?
                        { uri: oldRecordImageUri_REDUX }
                      :
                        { uri: `${config.BACKEND_URL}/inspector/records/${flatId}/${defectId}/image`}
                    )
                  : 
                    { uri: newRecordState.imageURL }
                }
              />
            </View>

            <View style={{height:'100%', width:'100%', position:'absolute'}}>
                <SketchCanvas
                  ref={ref => this.canvas = ref}
                  style={{ flex: 1 }}
                  strokeColor={'red'}
                  strokeWidth={7}
                  text={[{ 
                    text: `Record Updated on ${new Date().toLocaleDateString()}`,
                    font: '',
                    fontSize: 18,
                    fontColor: '#F7D732',
                    overlay: 'TextOnSketch',
                    anchor: { x: 0, y: 1 },
                    position: { x: 40, y: 1160 },
                    coordinate: 'Absolute',
                    alignment: 'Center',
                    lineHeightMultiple: 1.2
                  }]}
                />
            </View>

            {!sketchView && <View style={{height:'100%', width:'100%', position:'absolute'}}></View>}

          </ViewShot>  


        {!sketchView && <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}>
          <BackButton fill="#f0f0f0" />
        </TouchableOpacity>}

        {sketchView && <TouchableOpacity
          onPress={() => {
            setClearChange(!clearChange);
          }}
          style={styles.undoButton}>
          <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '600', color: '#F7D732', padding: 12 }}>Clear</Text>
        </TouchableOpacity>}

        {sketchView && <TouchableOpacity
          onPress={() => {
            setUndoChange(!undoChange);
          }}
          style={styles.clearButton}>
          <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '600', color: '#F7D732', padding: 12 }}>Undo</Text>
        </TouchableOpacity>}

        {sketchView && <TouchableOpacity
          onPressIn={() => {
            saveViewShot();
          }}
          onPressOut={() => {
            console.log('--- REDUX Uri ----')
            console.log(oldRecordImageUri_REDUX)
            console.log(newRecordState.imageURL)
            setSketchView(false);
          }}
          style={styles.saveButton}>
          <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '600', color: 'black', padding: 12 }}>Save</Text>
        </TouchableOpacity>}

        {!sketchView && <TouchableOpacity
          onPress={() => {
            downloadViewShot();
          }}
          style={styles.downloadButton}>
          {/* <Text style={{textAlign:'center', fontSize:25, fontWeight:'600' , color:'black', padding:12}}>Download to Photos</Text> */}
          <DownloadIcon
            borderColor='black'
            borderWidth={2}
            fill='#f0f0f0'
          />
        </TouchableOpacity>}

        {!sketchView && <TouchableOpacity
          onPress={() => {
            setSketchView(true);
          }}
          style={styles.drawButton}>
          <PenIcon
            borderColor='black'
            borderWidth={3}
            fill='#f0f0f0' />
        </TouchableOpacity>}

        {sketchView && <TouchableOpacity
          onPress={() => {
            setClearChange(!clearChange);
            setSketchView(false);
          }}
          style={styles.closeButton}>
          <CloseIcon
            borderColor='black'
            borderWidth={3}
            fill='#f0f0f0' />
        </TouchableOpacity>}

        {/* {sketchView && <TouchableOpacity
          onPress={()=>{
            
          }}
          style={styles.colorPicker}>
          <Circle 
          borderColor='white'
          borderWidth={3}
          fill={`${activeColor}`}/>
        </TouchableOpacity>}             */}

      </View>
    </>
  );
}

export default ImageModal;


const styles = StyleSheet.create({
  goBackButton: {
    position:"absolute", 
    height:60, 
    width:60, 
    top:'6%', 
    left:'6%', 
    justifyContent:'center', 
    shadowColor:'black', 
    shadowOpacity:0.85, 
    shadowOffset:{width:5, height:5}
  },
  undoButton: {
    position:"absolute", 
    top:'6%', 
    right:'34%', 
    justifyContent:'center', 
    alignItems:'center', 
    shadowColor:'black', 
    shadowOpacity:0.85, 
    shadowOffset:{width:5, height:5}, 
    borderWidth:2, 
    borderColor:'#F7D732', 
    borderRadius:6,
  },
  clearButton: {
    position:"absolute", 
    top:'6%', 
    right:'20%', 
    justifyContent:'center', 
    alignItems:'center', 
    shadowColor:'black', 
    shadowOpacity:0.85, 
    shadowOffset:{width:5, height:5}, 
    borderWidth:2, 
    borderColor:'#F7D732', 
    borderRadius:6,},
  saveButton: {
    position:"absolute", 
    top:'6%', 
    right:'6%', 
    justifyContent:'center', 
    alignItems:'center', 
    shadowColor:'black', 
    shadowOpacity:0.85, 
    shadowOffset:{width:5, height:5}, 
    backgroundColor:'#F7D732' , 
    borderWidth:2, 
    borderColor:'black', 
    borderRadius:6,
  },
  downloadButton: {
    width:50,
    height:50,
    position:"absolute", 
    top:'6.3%', 
    right:'6%', 
    justifyContent:'center', 
    alignItems:'center', 
    shadowColor:'black', 
    shadowOpacity:0.85, 
    shadowOffset:{width:5, height:5}, 
  },
  drawButton: {
    width:60,
    height:60,
    position:"absolute", 
    top:'6%', 
    right:'16%', 
    justifyContent:'center', 
    alignItems:'center', 
    shadowColor:'black', 
    shadowOpacity:0.85, 
    shadowOffset:{width:5, height:5}, 
  },
  closeButton: {
    width:60,
    height:60,
    position:"absolute", 
    top:'6%', 
    left:'6%', 
    justifyContent:'center', 
    alignItems:'center', 
    shadowColor:'black', 
    shadowOpacity:0.85, 
    shadowOffset:{width:5, height:5}, 
  },
  colorPicker: {
    width:50,
    height:50,
    position:"absolute", 
    bottom:'4%', 
    right:'6%', 
    justifyContent:'center', 
    alignItems:'center', 
    shadowColor:'black', 
    shadowOpacity:0.85, 
    shadowOffset:{width:5, height:5}, 
  }
});