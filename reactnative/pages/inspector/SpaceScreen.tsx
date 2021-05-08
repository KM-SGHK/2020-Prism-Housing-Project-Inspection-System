import React, { ReactNode, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, Text as Text , TouchableOpacity, ScrollView, GestureResponderEvent } from 'react-native';
//@ts-ignore
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { selectedSpace } from '../../redux/flat/IdSavingActions';
import { showFeatureAndDefect } from '../../redux/feature/actions';
import Svg, {Circle, Pattern, Defs, Text as SvgText, Image as SvgImage} from 'react-native-svg';
import config from '../../config';
import SvgUri from 'react-native-svg-uri';
import {floorplan} from './assets/SvgArr';

const SpaceScreen = () => {
  // console.log(useSelector((state: RootState)=> state.idSaving))
  
  const dispatch = useDispatch();
  // const spacesPageValueAll = useSelector((state:RootState)=>state.spaces);
  // console.log(spacesPageValueAll)
  const selectedFlatInfo = useSelector((state:RootState)=>state.spaces.selectedFlatInfo);
  // console.log(selectedFlatInfo);

  const spacesValues = useSelector((state:RootState)=>state.spaces.result);
  // console.log(spacesValues);

  // const CarmelT11A = require('./assets/CarmelT11A.svg');
  const navigation = useNavigation();

  const showHeader = selectedFlatInfo.map((value,index)=>
    <View key = {index}>
    <Text style={[styles.title, {fontWeight: '800'}]}>Carmel, T{value.tower},{value.floor}{value.room}</Text>
    </View>
    )

  const selectedFlatId = useSelector((state:RootState)=> state.idSaving.flatId)

  const onShowFeatureAndDefect = (flatId, spaceId)=>{
    dispatch(showFeatureAndDefect(flatId,spaceId));
  }

  const onSelectedSpaceValue = (selectedSpaceId) => {
    dispatch(selectedSpace(selectedSpaceId));
  }

  const spacesValue = spacesValues.map((value, index) => {
    const selectedSpaceName = value.space;
    return(
    <TouchableOpacity
      key={index}
      onPress={() => {
        onShowFeatureAndDefect(selectedFlatId, value.id);
        onSelectedSpaceValue(value.id);
        navigation.navigate("Feature",{
          spaceName: selectedSpaceName
        })
      }}
      style={styles.MarkersAll}
    >
      <Text style={{fontSize: 18, fontWeight: "700", fontFamily: "NotoSansTC-Black"}}>
        {value.space}
      </Text>
      <Text>
        現有瑕疵:  {value.defects_number==null? 0 : value.defects_number}
      </Text>
      {/* <Text>{value.defectsNum}</Text> */}
    </TouchableOpacity>)})


  const showSpacesOnSvg = spacesValues.map((value, index)=>{
    const defectsNum = value.defects_number==null? 0 : value.defects_number;
    const selectedSpaceName = value.space;
    // console.log(selectedSpaceName);
    return(
    <>
    <Circle key={index} cx={value.centroidX} cy={value.centroidY} r = "50" fill="#FFCC00" opacity="1" stroke="#FFCC00" strokeWidth="5"
            onPress={() => {
              onShowFeatureAndDefect(selectedFlatId, value.id);
              onSelectedSpaceValue(value.id);
              navigation.navigate("Feature",{
                spaceName: selectedSpaceName
              })
            }}
    />
    <SvgText x={value.centroidX-value.space.length*8.4} y={value.centroidY-5} fontSize={16} fill="black" fontFamily={"NotoSansTC-Black"} fontWeight={'700'}
                onPress={() => {
                  onShowFeatureAndDefect(selectedFlatId, value.id);
                  onSelectedSpaceValue(value.id);
                  navigation.navigate("Feature",{
                    spaceName: selectedSpaceName
                  })
                }}
    >
      {value.space}
    </SvgText>
    <SvgText x={value.centroidX-defectsNum.toString().length*40} y={value.centroidY+15} fontSize={14} fill="black" fontFamily={"NotoSansTC-Light"}
                onPress={() => {
                  onShowFeatureAndDefect(selectedFlatId, value.id);
                  onSelectedSpaceValue(value.id);
                  navigation.navigate("Feature",{
                    spaceName: selectedSpaceName
                  })
                }}
    >
      現有瑕疵：{defectsNum}
    </SvgText>
    </>
  )
})

  // const floorplan = useSelector((state:RootState)=> state.flatTable.result);



  const showFloorplan = floorplan.map((value, index) =>{
    // const string = `./assets/${value.floorplan}`;
    if(selectedFlatId==value.flat_id.toString()){
    const Carmel = value.floorplan;
    return(
      <Carmel key={index} width="750" height="750"/>
    )}
  })


  return (
    <>
        <ScrollView style={styles.scrollStyle}>
    <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
      {/* <StatusBar barStyle="dark-content" /> */}
        <View style={styles.titleContainer}>
          <View style={styles.titleBox}>
            {showHeader}
          </View>
        </View>
        <View style={styles.svgContainer}>
            <Svg width="750" height="750">
              {showFloorplan}
               {showSpacesOnSvg}
            </Svg>
          </View>
        <View style={styles.MarkersAllContainer}>
          {spacesValue}
        </View>
      </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15,
    zIndex: 1,
    marginBottom: 30,
    marginTop: 30
  },
  titleBox: {
    marginBottom: 15,
    backgroundColor: "#FFF",
    width: 300,
    paddingTop: 15,
    paddingBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
  },
  svgContainer:{
    justifyContent: "center",
    alignItems: "center"
  },
  svg:
 {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    position: "relative",
    width: 750,
    height: 750
  },
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Markers0: {
    backgroundColor: "yellow",
    width: 80,
    height: 80,
    borderColor: "black",
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 240,
    left: -35,
  },
  Markers1: {
    backgroundColor: "yellow",
    width: 80,
    height: 80,
    borderColor: "black",
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 430,
    left: 20,
  },
  Markers2: {
    backgroundColor: "yellow",
    width: 80,
    height: 80,
    borderColor: "black",
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 55,
    left: -150,
  },
  Markers3: {
    backgroundColor: "yellow",
    width: 80,
    height: 80,
    borderColor: "black",
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 300,
    left: -155,
  },
  Markers4: {
    backgroundColor: "yellow",
    width: 80,
    height: 80,
    borderColor: "black",
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 220,
    left: 205,
  },
  Markers5: {
    backgroundColor: "yellow",
    width: 80,
    height: 80,
    borderColor: "black",
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: -55,
    left: 100,
  },
  MarkersAllContainer: {
    // top: 500,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative',

  },
  MarkersAll: {
    backgroundColor: "#F7D732",
    width: 150,
    height: 150,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
  },
  scrollStyle:{
    flex: 1,

  }
});

export default SpaceScreen;