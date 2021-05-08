import React from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';
//@ts-ignore
import EnlargeIcon from '../assets/icons/expand.svg'
import { useNavigation } from '@react-navigation/native';


const EnlargeButton = () => {
    const navigation = useNavigation();

    return (
        <View
            style={{ position: "absolute", height: 50, width: 50, bottom: '8%', right: '4%', justifyContent: 'center' }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ImageModal');
                }}>
                <EnlargeIcon
                    fill="white"
                />
            </TouchableOpacity>
        </View>
    )
}


export default EnlargeButton;