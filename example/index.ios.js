import React, { Component } from 'react'
import { AppRegistry, View, Picker } from 'react-native'

class example extends Component {
  state = {
    value: 'one',
  }

  handleValueChange = (value) => {
    this.setState({ value })
  }

  render() {
    return (
      <View>
        <Picker
          selectedValue={this.state.value}
          onValueChange={this.handleValueChange}>
          <Picker.Item label="one" value="one" />
          <Picker.Item label="two" value="two" />
          <Picker.Item label="three" value="three" />
          <Picker.Item label="four" value="four" />
        </Picker>
      </View>
    )
  }
}

AppRegistry.registerComponent('example', () => example)
