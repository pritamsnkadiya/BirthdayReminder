import React from 'react';
import {Share, Image,StyleSheet, BackHandler, FlatList, Text, View, Alert, Platform, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import {getAssetByFilename} from './Asset';
import CustomMenuIcon from './component/CustomMenuIcon';
import RNLocalNotifications from 'react-native-local-notifications';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class BirthdayList extends React.Component {

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      handleBackButtonClick() {
        this.props.navigation.navigate('Home');
        return true;
      }

  static navigationOptions = ({ navigation }) => { 
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <View style={{flex:1,flexDirection:'row'}}>
            <TouchableOpacity onPress={() =>{params.handleSave()}}>
                <Image
                    source={getAssetByFilename("setting")}
                    //source={require('/home/pritamsankadiya/Desktop/testMayank/BirthdayReminder/android/app/src/main/res/mipmap-mdpi/setting.png')}
                    style={{height: 20,marginRight:20 }}/>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => alert('Right Menu Dot Clicked')}>
                {/* <Image
                    source={require('/home/pritamsankadiya/Desktop/testMayank/BirthdayReminder/android/app/src/main/res/mipmap-mdpi/right_side_bar.png')}
                    style={{height: 20,marginRight:20 }}/>       */}
                     <CustomMenuIcon
          //Menu Text
          menutext="Menu"
          //Menu View Style
          menustyle={{
            marginRight: 16,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
          //Menu Text Style
          textStyle={{
            color: 'white',
          }}
          //Click functions for the menu items
          option1Click={() => {
            params.handleMenu()
          }}
          option2Click={() => {
            params.handleShare()
          }}
        />
            </TouchableOpacity> 
        </View>
      ),
    };
};

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this._settingScreen });  
    this.props.navigation.setParams({ handleMenu: this._handleUpcomingEvent });
    this.props.navigation.setParams({ handleShare: this._handleShareApp });
  }

  _settingScreen(){
      this.props.navigation.navigate('Settings');
    }

    _handleUpcomingEvent(){
        this.props.navigation.navigate('UpcomingEvent');
      }

      _handleShareApp(){
        Share.share({
            message: 'SPAAK: we\'re helping your business with awesome React Native apps',
            url: 'http://spaak.com',
            title: 'Wow, did you see that?'
          }, {
            // Android only:
            dialogTitle: 'Share Birthday\'s Remainder!',
            // iOS only:
            excludedActivityTypes: [
              'com.apple.UIKit.activity.Pritam'
            ]
          })
      }


    constructor(props) {
    super(props);
    this._settingScreen = this._settingScreen.bind(this);
    this._handleUpcomingEvent = this._handleUpcomingEvent.bind(this);
    this._handleShareApp = this._handleShareApp.bind(this);

		this.state = {
                isLoading: true, 
                FlatListItems: [],
            }
              db.transaction(tx => {
                tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
                  var temp = [];
                  for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
//RNLocalNotifications.createNotification(results.rows.item(i).user_id, 'Happy ' + results.rows.item(i).user_type + results.rows.item(i).user_name, results.rows.item(i).date + ' 12:52', 'default');

console.log(results.rows.item(results.rows.length-1).user_id)
console.log('Happy ' + results.rows.item(results.rows.length-1).user_type + results.rows.item(results.rows.length-1).user_name)
console.log(results.rows.item(results.rows.length-1).date)

                  }
RNLocalNotifications.createNotification(results.rows.item(results.rows.length-1).user_id, 'Happy ' + results.rows.item(results.rows.length-1).user_type + ' '+ results.rows.item(results.rows.length-1).user_name, results.rows.item(results.rows.length-1).date + ' 06:00', 'default');
//RNLocalNotifications.updateNotification(results.rows.item(results.rows.length-1).user_id, 'Happy ' + results.rows.item(results.rows.length-1).user_type + ' '+ results.rows.item(results.rows.length-1).user_name, results.rows.item(results.rows.length-1).date + ' 01:18', 'default');

                    // RNLocalNotifications.createNotification(4, 'Priyta text', '2019-06-18 12:55', 'default');
                  this.setState({
                    FlatListItems: temp,
                  });
                });
              });
    }
 
    ListViewItemSeparator = () => {
        return (
          <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
        );
      };

    clickHandler = () => {
        this.props.navigation.navigate('Home')
      };

      deleteUser = (txn) => {
        var that = this;
        db.transaction(tx => {
          tx.executeSql(
            'DELETE FROM  table_user where user_id=?',
            [txn],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'User deleted successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => that.props.navigation.navigate('Home'),
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                alert('Please insert a valid User Id');
              }
            }
          );
        });
      };

     
	render() {
		return (
			<View style={styles.MainContainer}>

        <FlatList
          data={this.state.FlatListItems}
         // notificationCall(data)
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          
          renderItem={({ item }) => (
           
            <View key={item.user_id} style={{flex:1, flexDirection: 'column',backgroundColor: 'white', padding: 20}} >

                <Card style={{margin:10,elevation:5}}>
                    <Card.Content>
                        <View>
                            <View
                                style={{flexDirection:'row',justifyContent: 'space-between',flexWrap: 'wrap', backgroundColor: '#fff',}}>
                                    <Image
                                        source={{uri: ('data:image/png;base64,'+item.user_profile_pic)}}
                                        //source={require('/home/pritamsankadiya/Desktop/testMayank/BirthdayReminder/android/app/src/main/res/mipmap-xhdpi/user.png')}
                                        style={{ width: 40, height: 40 }}/>

                                    <View>

                                        <Text 
                                            style={{textAlignVertical:'center',marginRight:170, 
                                            padding:2,
                                            fontSize: 20,
                                            fontWeight:'bold',
                                            color: '#000',}}
                                            >{item.user_name}
                                        </Text>
                                            <View 
                                                style={{flexDirection:'row',justifyContent: 'space-between',flexWrap: 'wrap'}}>
                                                    <Text style={styles.textViewContainer} >{item.user_type}</Text>
                                                        <Text  
                                                            style={{textAlignVertical:'center',
                                                            padding:2,
                                                            color: '#000',}}
                                                            >{item.date}</Text>
                                            </View>
                                            <Text style={styles.textViewContainer} >{item.date}</Text>

                                    </View>

                                    <TouchableOpacity
                                      activeOpacity={0.5}
                                      onPress={this.deleteUser.bind(this,item.user_id)}>

                                    <Image  
                                        source={getAssetByFilename("delete")}
                                        //source={require('/home/pritamsankadiya/Desktop/testMayank/BirthdayReminder/android/app/src/main/res/mipmap-xhdpi/delete.png')}
                                        style={{ width: 30, height: 30 }}/>
                                      </TouchableOpacity>
                                </View>
                            </View>
                    </Card.Content>
                </Card>
            </View>
          )}/>
            <View style={styles.MainContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.clickHandler}
                    style={styles.TouchableOpacityStyle}>
                        <Image
                            source={getAssetByFilename("add_birthday")}
                             //source={require('/home/pritamsankadiya/Desktop/testMayank/BirthdayReminder/android/app/src/main/res/mipmap-xhdpi/add_birthday.png')}
                            style={styles.FloatingButtonStyle}/>
                </TouchableOpacity>
            </View>
		</View>
	);}
}
        
    const styles = StyleSheet.create({
 	MainContainer :{
	// Setting up View inside content in Vertically center.
	justifyContent: 'center',
	flex:1,
	paddingTop: (Platform.OS === 'ios') ? 20 : 0,
	padding: 2,
			 
	},
			 
	textViewContainer: {
	textAlignVertical:'center', 
	padding:2,
	fontSize: 15,
	color: '#000',
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
      },
     
      FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
      },
});