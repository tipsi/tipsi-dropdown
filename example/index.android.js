
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
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
            styling='{"style":{"backgroundColor":"0x0000FF","indicatorImageName":"custom_triangle.png","fontSize":"16","textColor":"0xCCCCCC","textAlignment":"Right"}}'/>
      </View>
    );
  }
}

AppRegistry.registerComponent('example', () => example);
