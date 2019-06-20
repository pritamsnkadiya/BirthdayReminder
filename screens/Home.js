
import React, {Component} from 'react';
import {Share,TouchableOpacity, Image,StyleSheet,ImageBackground, Text,TextInput,BackHandler, View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { Checkbox } from 'react-native-paper';
import Mybutton from './component/Mybutton'
import CustomMenuIcon from './component/CustomMenuIcon';
import {getAssetByFilename} from './Asset';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
var db2 = openDatabase({ name: 'UserDatabaseEvent.db' });
var tmp

export default class Home extends Component {

  componentWillMount() {
    
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
   
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    
    BackHandler.exitApp();
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
  
            <TouchableOpacity>
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
    state = {
        checked: false,
        checked1:false,
        ImageSource: null,
    };

    constructor(props) {
        super(props);
        this._settingScreen = this._settingScreen.bind(this);
        this._handleUpcomingEvent = this._handleUpcomingEvent.bind(this);
        this._handleShareApp = this._handleShareApp.bind(this);
        this.state = {
          user_name: '',
          date:'2019-06-18',
          user_type: '',
          user_profile_pic: '',
        };
      }

      register_user = () => {
        var that = this;
        const { user_name } = this.state;
        const { date } = this.state;
        const { user_type } = this.state;
        const { user_profile_pic } = this.state;
        if (user_name) {
          if (tmp) {
            if (user_profile_pic) {
          db2.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO table_user_event (user_name, date, user_type) VALUES (?,?,?)',
              [user_name, date, tmp],
              (tx, results) => {
               // console.log();('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                } else {
                  alert('Registration Failed');
                }
              }
            );
          });
              db.transaction(function(tx) {
                tx.executeSql(
                  'INSERT INTO table_user (user_name, date, user_type, user_profile_pic) VALUES (?,?,?,?)',
                  [user_name, date, tmp, user_profile_pic],
                  (tx, results) => {
                   // console.log();('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      that.props.navigation.navigate('BirthdayList')
                      // Alert.alert(
                      //   'Success',
                      //   'You are Registered Successfully',
                      //   [
                      //     {
                      //       text: 'Ok',
                      //       onPress: () =>
                      //         that.props.navigation.navigate('BirthdayList')
                      //     },
                      //   ],
                      //   { cancelable: false }
                      // );
                    } else {
                      alert('Registration Failed');
                    }
                  }
                );
              });
            } else {
                alert('Please Upload User Pic');
              }
            } else {
              alert('Please Select Types');
            }
        } else {
          alert('Please fill Name');
        }
      };

      onClickAnniversary=()=>{
        const { checked1 } = this.state;
        this.setState({ checked1: !checked1 })
        tmp = 'Anniversary'
    }

    onClickBirthday=()=>{

      const { checked } = this.state;
      this.setState({ checked: !checked })
      tmp = 'Birthday'
      //alert(tmp);
  
  }

  render() {
    const { checked } = this.state;
    const { checked1 } = this.state;
    const options = {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
    return (
        <View style = {styles.container}>
            <View
                style={{flexWrap: 'wrap', backgroundColor: '#fff', marginTop:50,alignItems:'center'}}>
                    <TouchableOpacity
                        onPress = {() =>{
                            ImagePicker.showImagePicker(options, (response) => {
                                //console.log('Response = ', response);

                                if (response.didCancel) {
                                  console.log('User cancelled image picker');
                                } else if (response.error) {
                                  console.log('ImagePicker Error: ', response.error);
                                }else {
                                    let source = { uri: response.uri };
                                        this.setState({
                                            ImageSource: source,
                                            user_profile_pic: response.data
                                            
                                    });
                                }
                              });

                        }}>
                            <ImageBackground
                                source={getAssetByFilename("pic_upload")}
                                style={{ width: 45, height: 40 }}>

                                <Image
                                    style = {{backgroundColor:'red'}} 
                                source={this.state.ImageSource} style={{ width: 70, height: 70 }} />
                            </ImageBackground>
                    </TouchableOpacity>

            </View>

            <View
                style={{flexWrap: 'wrap', marginTop:30,marginLeft:40}}>
                    <TextInput
                        style = {{fontSize:18}}
                        placeholder = "Name"
                        placeholderTextColor = "#f7734f"
                        onChangeText={user_name => this.setState({user_name})}/>
            </View>

            <View
                style={{flexWrap: 'wrap', marginTop:10,marginLeft:40}}>
                    <Text style={{fontSize:18,color:'#f7734f'}}>Birthday</Text>
            </View>

            <View
                style={{flexWrap: 'wrap', marginTop:10,marginLeft:100}}>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.date} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder="select date"
                        placeholderTextColor = "#f7734f"
                        format="YYYY-MM-DD"
                        minDate="2019-06-18"
                        maxDate="2020-12-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                                dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                        dateInput: {
                            marginLeft: 36
                            }
                        }}
                    onDateChange={(date) => {this.setState({date: date})}}
                    />
            </View>

            <View
                style={{flexWrap: 'wrap', marginTop:50,marginLeft:40}}>
                    <Text style={{fontSize:18,color:'#f7734f'}}>Type</Text>
            </View>

            <View style={{flexDirection:'row'}}>
                <View 
                    style={{flexDirection:'row', flexWrap: 'wrap',marginLeft:60}}>
                    <View style={{ borderWidth:0.5 , borderColor : 'green', marginTop:5}}>
                        <Checkbox 
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => { this.onClickBirthday()}}/>
            </View>
                            <Text style={{fontSize:18,color:'#f7734f',marginTop:16,marginLeft:5}}>Birthday</Text>
                </View>

                <View
                    style={{flexDirection:'row', flexWrap: 'wrap',marginLeft:10}}>
                     <View style={{ borderWidth:0.5 , borderColor : 'green', marginTop:5}}>
                    <Checkbox 
                       status={checked1 ? 'checked' : 'unchecked'}
                       onPress={() => { this.onClickAnniversary()}}/>
                       </View>
                        <Text style={{fontSize:18,color:'#f7734f',marginTop:16,marginLeft:5}}>Anniversary</Text>
                </View>
            </View>

            <View
                style={{ flexWrap: 'wrap', marginTop:50,marginLeft:40}}>
                    <Mybutton
                    title="OK"
                    customClick={this.register_user.bind(this)}/>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#000',
       padding: 7,
       margin: 30,
       height: 40,
       alignItems:'center',
       marginRight:60
    },
    submitButtonText:{
       color: 'white',
       fontWeight: 'bold',
       fontSize:17
    }
});
