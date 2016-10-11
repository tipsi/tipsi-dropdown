import React, { Component } from 'react'
import { AppRegistry, View } from 'react-native'
import Dropdown from 'tipsi-dropdown'

class example extends Component {
  state = {
    value: 'three',
    options: ['one', 'two', 'three', 'four'],
  }

  handleChanged = (event) => {
    console.log(event.nativeEvent)
  }

  render() {
    return (
      <View>
        <Dropdown
          options={this.state.options}
          onChange={this.handleChanged}
          backgroundColor="#AAAAAA"
          borderColor="#0000FF"
          fontSize={18}
          separatorHeight={2}
          separatorColor="#0000FF"
          fontName="Arial"
          textColor="#000000"
          textAlignment="Left"
          cornerRadius={20}
          indicatorImage={require('./plus.png')}
          style={{
            position: 'absolute',
            top: 25,
            left: 25,
            width: 156,
            height: 40,
          }}
        />
      </View>
    )
  }
}

AppRegistry.registerComponent('example', () => example)
