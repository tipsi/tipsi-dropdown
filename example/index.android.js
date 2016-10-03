
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
                  position: 'absolute', top: 25, left: 25,
                  width:156, height:40
                }
            }
            onItemChanged={this._onItemChanged}
            styling='{"style":{"backgroundColor":"0x0000FF","indicatorImageName":"custom_triangle.png","fontSize":"16","textFont":"Arial","textColor":"0x0000FF","textAlignment":"Right","cornerRadius":10}}'/>
      </View>
    );
  }
  _onItemChanged = (event) => {
      console.log(event)
  }
}

AppRegistry.registerComponent('example', () => example);
