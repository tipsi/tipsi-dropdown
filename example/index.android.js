import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Dropdown from 'tipsi-dropdown';

class example extends Component {
  handleChanged = (event) => {
      console.log(event);
  }

  render() {
    return (
      <View>
        <Dropdown
          options={['one', 'two', 'three', 'four']}
          onChange={this.handleChanged}
          backgroundColor="#AAAAAA"
          borderColor="#0000FF"
          indicatorImageName="custom_triangle.png"
          fontSize={18}
          separatorHeight={2}
          separatorColor="#0000FF"
          fontName="Arial"
          textColor="#000000"
          textAlignment="Left"
          cornerRadius={20}
          style={{
            position: 'absolute',
            top: 25,
            left: 25,
            width:156,
            height:40,
          }}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('example', () => example);
