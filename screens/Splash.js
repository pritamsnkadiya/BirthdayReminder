import React, {Component} from 'react';
import {Platform, Button, ScrollView, StyleSheet, TextInput, Text, View, Image} from 'react-native';
import {getAssetByFilename} from './Asset';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
var db2 = openDatabase({ name: 'UserDatabaseEvent.db' });

export default class Splash extends Component {

    constructor(props) {
        super(props);
        db.transaction(function(txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",[],
            function(tx, res) {
                //alert('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), date VARCHAR(20), user_type VARCHAR(20), user_profile_pic VARCHAR(255))',
                  []
                );
              }
            }
          );
        });
        db2.transaction(function(txn) {
            txn.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user_event'",[],
              function(tx, res) {
                      if (res.rows.length == 0) {
                          txn.executeSql('DROP TABLE IF EXISTS table_user_event', []);
                          txn.executeSql(
                              'CREATE TABLE IF NOT EXISTS table_user_event(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), date VARCHAR(20), user_type VARCHAR(20))',
                    []
                  );
                }
              }
            );
          });
    }

    componentWillMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Home')
        }, 3000);
    }

    render() {
        return (
            <View style={styles.container_button}>
                <Image
                    style={{width: 200, height: 170}}
                    source={getAssetByFilename("main_logo")}
                    //source={require('/home/pritamsankadiya/Desktop/testMayank/BirthdayReminder/android/app/src/main/res/mipmap-xxxhdpi/main_logo.png')}
                    //source={{uri: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.dfordelhi.in%2Fwp-content%2Fuploads%2F2017%2F12%2Fmehndi-design-2013-new-latest-hd-wallpapers-e1513078240270.jpg&imgrefurl=https%3A%2F%2Fwww.dfordelhi.in%2Ftop-5-best-mehendi-walas-in-delhi-that-you-must-hire-for-your-wedding%2Fmehndi-design-2013-new-latest-hd-wallpapers%2F&docid=jHV_9_w_62Hl3M&tbnid=KOaPz_7_tOrsPM%3A&vet=12ahUKEwjWpvf5gMPiAhULu48KHelxBG44yAEQMygLMAt6BAgBEAw..i&w=1100&h=619&bih=637&biw=1323&q=mehndi%20design%20images%20hd&ved=2ahUKEwjWpvf5gMPiAhULu48KHelxBG44yAEQMygLMAt6BAgBEAw&iact=mrc&uact=8#h=619&imgdii=KdLjgjdMDfnx5M:&vet=12ahUKEwjWpvf5gMPiAhULu48KHelxBG44yAEQMygLMAt6BAgBEAw..i&w=1100'}}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container_button: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
