//This is an example code for the popup menu//
import React, { Component } from 'react';
//import react in our code.
import { View, Text,Image, TouchableOpacity  } from 'react-native';
//import all the components we are going to use.
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
//import menu and menu item
 
export default class CustomMenuIcon extends Component {
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  option1Click = () => {
    this._menu.hide();
    this.props.option1Click();
  };
  option2Click = () => {
    this._menu.hide();
    this.props.option2Click();
  };
  render() {
    return (
      <View style={this.props.menustyle}>
        <Menu
            ref={this.setMenuRef}
            button={
                <TouchableOpacity onPress={this.showMenu}>
                    <Image 
                        source={{uri: 'https://aboutreact.com/wp-content/uploads/2018/12/menu_icon.png'}} 
                        style={{width: 20, height: 20}} />
                </TouchableOpacity>
             }>
          <MenuItem onPress={this.option1Click}>Today's/upcoming event's</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.option2Click}></MenuItem>
        </Menu>
      </View>
    );
  }
}