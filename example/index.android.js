import React, { Component } from 'react'
import { AppRegistry, View } from 'react-native'
import Dropdown from 'tipsi-dropdown'

const dropdownStyle = {
  position: 'absolute',
  top: 25,
  left: 25,
  width: 156,
  height: 40,
}

const dropdownStyle2 = {
  position: 'absolute',
  top: 70,
  left: 25,
  width: 156,
  height: 40,
}

const dropdownItemStyle = {
  backgroundColor: '#AAAAAA',
  borderColor: '#0000FF',
  fontSize: 18,
  separatorHeight: 2,
  separatorColor: '#0000FF',
  fontName: 'Arial',
  textColor: '#000000',
  textAlignment: 'Left',
  cornerRadius: 20,
}

const dropdownItemStyle2 = {
  backgroundColor: '#AA00AA',
  borderColor: '#0000FF',
  fontSize: 18,
  separatorHeight: 2,
  separatorColor: '#00FF00',
  fontName: 'Arial',
  textColor: '#000000',
  textAlignment: 'Left',
  cornerRadius: 20,
}

class example extends Component {
  state = {
    value: 'three',
    value2: 'four'
  }

  handleChange = (event) => {
    console.log(event.nativeEvent)
  }

  handleChange2 = (event) => {
    console.log(event.nativeEvent)
  }

  handleValueChange = (item, index) => {
    console.log(item, index)
    this.setState({ value: item })
  }

  handleValueChange2 = (item, index) => {
    console.log(item, index)
    this.setState({ value2: item })
  }

  render() {
    return (
      <View>
        <Dropdown
          style={dropdownStyle}
          itemStyle={dropdownItemStyle}
          selectedValue={this.state.value}
          indicator={require('./plus.png')}
          onChange={this.handleChanged}
          onValueChange={this.handleValueChange}>
          <Dropdown.Item label="One" value="one" />
          <Dropdown.Item label="Two" value="two" />
          <Dropdown.Item label="Three" value="three" />
          <Dropdown.Item label="Four" value="four" />
        </Dropdown>
        <Dropdown
          style={dropdownStyle2}
          itemStyle={dropdownItemStyle2}
          selectedValue={this.state.value2}
          indicator={require('./plus.png')}
          onChange={this.handleChanged2}
          onValueChange={this.handleValueChange2}>
          <Dropdown.Item label="One" value="one" />
          <Dropdown.Item label="Two" value="two" />
          <Dropdown.Item label="Three" value="three" />
          <Dropdown.Item label="Four" value="four" />
        </Dropdown>
      </View>
    )
  }
}

AppRegistry.registerComponent('example', () => example)
