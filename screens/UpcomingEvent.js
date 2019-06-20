import React from 'react';
import {Share, Image,StyleSheet, BackHandler, FlatList, Text, View, Alert, Platform, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import {getAssetByFilename} from './Asset';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabaseEvent.db' });
export default class UpcomingEvent extends React.Component {

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

    constructor(props) {
    super(props);
		this.state = {
                isLoading: true, 
                FlatListItems: [],
            }
              db.transaction(tx => {
                tx.executeSql('SELECT * FROM table_user_event', [], (tx, results) => {
                  var temp = [];
                  for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                  }
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

	render() {
		return (
			<View style={styles.MainContainer}>

        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
           
            <View key={item.user_id} style={{flex:1, flexDirection: 'column',backgroundColor: 'white', padding: 20}} >

                <Card style={{margin:10,elevation:5}}>
                    <Card.Content>
                        <View>
                                    <View>
                                        <View style = {{alignSelf:'center'}}>
                                        <Text 
                                            style={{ 
                                            padding:2,
                                            fontSize: 20,
                                            fontWeight:'bold',
                                            color: '#000',}}
                                            >{item.user_name}
                                        </Text>
                                        </View>
                                            <View 
                                                style={{flexDirection:'row',justifyContent: 'space-between',flexWrap: 'wrap'}}>
                                                    <Text style={styles.textViewContainer} >{item.user_type}</Text>
                                                        <Text  
                                                            style={{textAlignVertical:'center',
                                                            padding:2,
                                                            color: '#000',}}
                                                            >{item.date}</Text>
                                            </View>
                                    </View>
                                </View>
                    </Card.Content>
                </Card>
            </View>

          )}/>
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