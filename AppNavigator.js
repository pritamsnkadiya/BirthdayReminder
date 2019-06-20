import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import Splash from './screens/Splash';
import Home from './screens/Home';
import BirthdayList from './screens/BirthdayList'
import Settings from './screens/Settings'
import {getAssetByFilename} from './screens/Asset';
import UpcomingEvent from './screens/UpcomingEvent'

class LogoTitle extends React.Component {
    render() {
      return (
        <Image
        />
      );
    }
  }

const AppNavigator = createStackNavigator({

    Splash:
        {
            screen: Splash,
            navigationOptions: 
            {
                header: null,
            },
        },

    Home:
        {
            screen: Home,
            navigationOptions: {
                headerLeft: (
                            <Image
                            
                                source={getAssetByFilename("small_logo")}
                                style={{ marginLeft:20, width: 30, height: 30 }}/>
                   
             
                  ),
                title: 'Birthdays!',
                headerStyle: {
                backgroundColor: '#fc934c',
            },
                headerTintColor: '#000',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
            // headerRight: (
            //     <View style={{flex:1,flexDirection:'row'}}>
            //         <TouchableOpacity onPress={() => alert('Right Menu Setting Clicked')}>
            //             <Image
            //                 source={require('/home/pritamsankadiya/Desktop/testMayank/BirthdayReminder/android/app/src/main/res/mipmap-mdpi/setting.png')}
            //                 style={{height: 20,marginRight:20 }}/>
            //         </TouchableOpacity>
         
            //         <TouchableOpacity onPress={() => alert('Right Menu Dot Clicked')}>
            //             <Image
            //                 source={require('/home/pritamsankadiya/Desktop/testMayank/BirthdayReminder/android/app/src/main/res/mipmap-mdpi/right_side_bar.png')}
            //                 style={{height: 20,marginRight:20 }}/>      
            //         </TouchableOpacity> 
            //     </View>
            //   ),
            },
        },
        BirthdayList:
        {
            screen: BirthdayList,
            navigationOptions: {
                headerLeft: (
                            <Image
                                source={getAssetByFilename("small_logo")}
                                style={{ marginLeft:20, width: 30, height: 30 }}/>
                   
             
                  ),
                title: 'Birthdays!',
                headerStyle: {
                backgroundColor: '#fc934c',
            },
                headerTintColor: '#000',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
            // headerRight: (
            //     <View style={{flex:1,flexDirection:'row'}}>
            //         <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
            //             <Image
            //                 source={require('/home/pritamsankadiya/Desktop/testMayank/BirthdayReminder/android/app/src/main/res/mipmap-mdpi/setting.png')}
            //                 style={{height: 20,marginRight:20 }}/>
            //         </TouchableOpacity>
         
            //         <TouchableOpacity onPress={() => alert('Right Menu Dot Clicked')}>
            //             <Image
            //                 source={require('/home/pritamsankadiya/Desktop/testMayank/BirthdayReminder/android/app/src/main/res/mipmap-mdpi/right_side_bar.png')}
            //                 style={{height: 20,marginRight:20 }}/>      
            //         </TouchableOpacity> 
            //     </View>
            //   ),
             },
        },

        Settings:
        {
            screen: Settings,
            navigationOptions: 
            {
                title: 'Settings',
                headerStyle: {
                backgroundColor: '#fc934c',
            },
                headerTintColor: '#000',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
            },
        },

        UpcomingEvent:
        {
            screen: UpcomingEvent,
            navigationOptions: 
            {
                title: 'Events',
                headerStyle: {
                backgroundColor: '#fc934c',
            },
                headerTintColor: '#000',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
            },
        },
});

export default createAppContainer(AppNavigator);