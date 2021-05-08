import React from 'react'
import {
    View,
    Text,
  } from 'react-native';



const RecordInfo = (props:{date:string, time:string, inspector:string}) => {

    return (
        <>
        <View style={{backgroundColor:'#ffffff', height:240, justifyContent:'center'}}>
            <Text style={{padding:15, marginLeft:30, fontSize:25}}>檢樓日期： {props.date}</Text>
            <Text style={{padding:15, marginLeft:30, fontSize:25}}>檢驗時間： {props.time}</Text>
            <Text style={{padding:15, marginLeft:30, fontSize:25}}>檢樓師： {props.inspector}</Text>
        </View>
        </>
    )
}

export default RecordInfo;