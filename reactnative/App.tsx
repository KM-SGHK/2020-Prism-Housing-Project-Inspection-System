import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';

import LoginScreen from './pages/login/LoginScreen';
import LoadingScreen from './pages/login/LoadingScreen';
import FlatScreen from './pages/inspector/FlatScreen';
import SpaceScreen from './pages/inspector/SpaceScreen'
import FeatureScreen from './pages/inspector/FeatureScreen'
import NewRecordScreen from './pages/inspector/NewRecordScreen'
import OldRecordScreen from './pages/inspector/OldRecordScreen'
import ImageModal from './pages/inspector/ImageModal'
import HomeScreen from './pages/developer/HomeScreen'
import Report01Screen from './pages/developer/Report01Screen'
import Report02Screen from './pages/developer/Report02Screen'
import Report03Screen from './pages/developer/Report03Screen'
import CustomDrawerContent from './components/CustomDrawerContent';
import LogoTopRight from './components/LogoTopRight';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, RootState } from './store';
import { imagePreviewSwitch } from './redux/imagePreview/actions'


//Part C2
const Drawer = createDrawerNavigator();

function DeveloperDrawer() {
  const dimensions = useWindowDimensions();
  return(
    <Drawer.Navigator 
      initialRouteName="DeveloperHome" drawerPosition="right"
      drawerType={dimensions.width >= 900 ? 'permanent' : 'slide'}
      drawerStyle={{backgroundColor:'#333333', borderLeftWidth:2, width:400}}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor:'#00CBC0', activeBackgroundColor:'#716215', inactiveTintColor:'#F7D732', 
        labelStyle: { fontSize: 24, fontWeight:'500', paddingLeft:8},
        itemStyle: { padding: 6, borderBottomWidth:2, borderBottomColor:'#666666'},
        contentContainerStyle:{padding:20}}}>
      <Drawer.Screen options={{ title: '主頁' }} name="DeveloperHome" component={HomeScreen} />
      <Drawer.Screen options={{ title: '單位檢驗問題概覽' }} name="DeveloperReport01" component={Report01Screen} />
      <Drawer.Screen options={{ title: '已檢查單位類型' }} name="DeveloperReport02" component={Report02Screen} />
      <Drawer.Screen options={{ title: '各類單位問題詳析' }} name="DeveloperReport03" component={Report03Screen} />
    </Drawer.Navigator>
  )
}

//Part C1
const InspectorStack = createStackNavigator();

function InspectorStackScreen() {
  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const imagePreview = useSelector((state: RootState) => state.imagePreview)

  return (
    <InspectorStack.Navigator initialRouteName="Flat">
      <InspectorStack.Screen name="Flat" component={FlatScreen}
        options={{
          title:'單位選擇',
          headerStyle:{backgroundColor:'#F7D732', height:85},
          headerTitleStyle:{fontSize:22},
          headerTintColor:'black',
          headerStatusBarHeight:20,
          headerRight: () => <LogoTopRight/>
        }}/>
      <InspectorStack.Screen name="Space" component={SpaceScreen} 
        options={{
          title:'檢查空間',
          headerStyle:{backgroundColor:'#F7D732', height:85},
          headerTitleStyle:{fontSize:22},
          headerTintColor:'black',
          headerStatusBarHeight:20,
          headerRight: () => <LogoTopRight/>
        }}/>
      <InspectorStack.Screen name="Feature" component={FeatureScreen} 
        options={{
          title:'瑕疵類別',
          headerStyle:{backgroundColor:'#F7D732', height:85},
          headerTitleStyle:{fontSize:22},
          headerTintColor:'black',
          headerStatusBarHeight:20,
          headerRight: () => <LogoTopRight/>
        }}/>
      <InspectorStack.Screen name="NewRecord" component={NewRecordScreen} 
        options={{
          title:'新增紀錄',
          headerStyle:{backgroundColor:'#F7D732', height:85},
          headerTitleStyle:{fontSize:22},
          headerTintColor:'black',
          headerStatusBarHeight:20,
          headerRight: () => <LogoTopRight/>,
          headerLeft: () => (
            <HeaderBackButton 
              tintColor='black'
              onPress={() => {
                dispatch(imagePreviewSwitch(false));
                navigation.goBack();
              }} 
            />
          ),
        }}/>
      <InspectorStack.Screen name="OldRecord" component={OldRecordScreen} 
        options={{
          title:'現有紀錄',
          headerStyle:{backgroundColor:'#F7D732', height:85},
          headerTitleStyle:{fontSize:20},
          headerTintColor:'black',
          headerStatusBarHeight:20,
          headerRight: () => <LogoTopRight/>,
          headerLeft: () => (
            <HeaderBackButton 
              tintColor='black'
              onPress={() => {
                navigation.goBack();
                dispatch(imagePreviewSwitch(false));
              }} 
            />
          ),
        }}/>
    </InspectorStack.Navigator>
  )
}

//Part B.
const LoginStack = createStackNavigator();

function LoginStackScreen() {
    return (
        // 4. initialRouteName: showing loading--> loading component from the start, headermode(?)
        <LoginStack.Navigator initialRouteName="Loading" headerMode="none" screenOptions={{
            gestureEnabled: false
        }}>
            <LoginStack.Screen name="Loading" component={LoadingScreen} />
            <LoginStack.Screen name="Inspector" component={InspectorStackScreen} />
            <LoginStack.Screen name="Developer" component={DeveloperDrawer} />
            <LoginStack.Screen name="Login" component={LoginScreen} />
        </LoginStack.Navigator>
    );
}

//Part A.
const RootStack = createStackNavigator();

// 2. Set App function, laying the ground for the 3 key pages
// 3. Create separate files for these pages (not in app.tsx)
// 3a. LoginScreen.tsx
export default function App() {
    return (
        // 5. connect navigation to store
        // 6. modal (rootStack, LoginStack)
        <Provider store={store}>
            <NavigationContainer>
                <RootStack.Navigator mode="modal" headerMode="none">
                    <RootStack.Screen name="Root" component={LoginStackScreen} />
                    <RootStack.Screen name="ImageModal" component={ImageModal}/>
                </RootStack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
  
});


