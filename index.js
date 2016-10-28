import React, { Component, Children, PropTypes } from 'react'
import { requireNativeComponent, View } from 'react-native'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import ImageSourcePropType from 'react-native/Libraries/Image/ImageSourcePropType'

export default class Dropdown extends Component {
  static propTypes = {
    ...View.propTypes,
    selectedValue: PropTypes.any,
    indicator: ImageSourcePropType,
    itemStyle: PropTypes.shape({
      backgroundColor: PropTypes.string,
      fontName: PropTypes.string,
      fontSize: PropTypes.number,
      textAlignment: PropTypes.string,
      cornerRadius: PropTypes.number,
      separatorHeight: PropTypes.number,
      separatorColor: PropTypes.string,
      borderWidth: PropTypes.number,
      borderColor: PropTypes.string,
      textColor: PropTypes.string,
    }),
    onChange: PropTypes.func,
    onValueChange: PropTypes.func,
  }

  state = this.stateFromProps(this.props)

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps))
  }

  onChange = (event) => {
    const { onChange, onValueChange } = this.props
    const { selectedIndex } = this.state
    const { nativeEvent } = event

    if (onChange) {
      onChange(event)
    }
    if (onValueChange) {
      onValueChange(
        nativeEvent.newValue,
        nativeEvent.newIndex
      )
    }

    // The dropdown is a controlled component. This means we expect the
    // on*Change handlers to be in charge of updating our
    // `selectedValue` prop. That way they can also
    // disallow/undo/mutate the selection of certain values. In other
    // words, the embedder of this component should be the source of
    // truth, not the native component.
    if (this.dropdown && selectedIndex !== nativeEvent.newIndex) {
      this.dropdown.setNativeProps({ selectedIndex })
    }
  }

  // Translate Dropdown prop and children into stuff that TipsiDropdown understands.
  stateFromProps(props) {
    const { children, selectedValue } = props
    let selectedIndex = 0
    const items = []

    Children.toArray(children).forEach((child, index) => {
      const { value, label } = child.props
      if (value === selectedValue) {
        selectedIndex = index
      }
      items.push({ value, label })
    })

    return { items, selectedIndex }
  }

  render() {
    const { indicator, style, itemStyle } = this.props
    const { items, selectedIndex } = this.state
    const indicatorImageName = indicator &&
      resolveAssetSource(indicator).uri

    return (
      <NativeDropdown
        ref={dropdown => this.dropdown = dropdown}
        style={style}
        items={items}
        selectedIndex={selectedIndex}
        indicatorImageName={indicatorImageName}
        onChange={this.onChange}
        {...itemStyle}
      />
    )
  }
}

Dropdown.Item = class extends Component {
  static propTypes = {
    value: PropTypes.any,
    label: PropTypes.string,
  }

  render() {
    // These items don't get rendered directly.
    return null
  }
}

const NativeDropdown = requireNativeComponent('TipsiDropdown', Dropdown, {
  nativeOnly: {
    items: true,
    selectedIndex: true,
    value: true,
    indicatorImageName: true,
    backgroundColor: true,
    fontName: true,
    fontSize: true,
    textAlignment: true,
    cornerRadius: true,
    separatorHeight: true,
    separatorColor: true,
    borderWidth: true,
    borderColor: true,
    textColor: true,
  },
})
