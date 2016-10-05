
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import Dropdown from 'tipsi-dropdown';

class example extends Component {
  render() {
    return (
      <View>
      <Dropdown items={["one", "two", "three", "four"]}
            style={
                {
                  position: 'absolute',
                  top: 25,
                  left: 25,
                  width:156,
                  height:40,
                  backgroundColor: '#AAAAAA',
                  borderColor: '#0000FF',
                  indicatorImageName: 'custom_triangle.png',
                  fontSize: 18,
                  separatorHeight: 2,
                  separatorColor: '#0000FF',
                  fontName: 'Arial',
                  textColor: '#000000',
                  textAlignment: 'Left',
                  cornerRadius: 20
                }
            } />
      </View>
    );
  }
  _onItemChanged = (event) => {
      console.log(event)
  }
}

AppRegistry.registerComponent('example', () => example);
