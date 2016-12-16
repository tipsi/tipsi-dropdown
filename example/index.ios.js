import React, { Component } from 'react'
import { AppRegistry, StyleSheet, View } from 'react-native'
import Dropdown from 'tipsi-dropdown'
// import { Picker as Dropdown } from 'react-native'

const styles = StyleSheet.create({
  dropdown1: {
    margin: 25,
    width: 156,
    borderRadius: 20,
    backgroundColor: '#AAAAAA',
    separatorHeight: 2,
    separatorColor: '#0000FF',
  },
  dropdown2: {
    margin: 25,
    width: 156,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#0000FF',
    backgroundColor: '#AA00AA',
    separatorHeight: 2,
    separatorColor: '#00FF00',
  },
  itemStyle1: {
    fontSize: 18,
    fontFamily: 'Arial',
    color: '#000000',
    textAlign: 'left',
  },
  itemStyle2: {
    fontSize: 18,
    fontFamily: 'Arial',
    color: '#000000',
    textAlign: 'left',
  },
})

class example extends Component {
  state = {
    value: 'four',
    value2: 'two',
  }

  images = {
    one: require('./plus.png'),
    two: require('./minus.png'),
    three: require('./minus.png'),
    // four: require('./minus.png')
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
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Dropdown
          style={styles.dropdown1}
          itemStyle={styles.itemStyle1}
          selectedValue={this.state.value}
          indicator={this.images[this.state.value]}
          onChange={this.handleChange}
          onValueChange={this.handleValueChange}>
          <Dropdown.Item label="One" value="one" />
          <Dropdown.Item label="Two" value="two" />
          <Dropdown.Item label="Three" value="three" />
          <Dropdown.Item label="Four" value="four" />
        </Dropdown>
        <Dropdown
          style={styles.dropdown2}
          itemStyle={styles.itemStyle2}
          selectedValue={this.state.value2}
          indicator={this.images[this.state.value2]}
          onChange={this.handleChange2}
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
