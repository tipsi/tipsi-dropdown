import React, { Component, Children, PropTypes } from 'react'
import { requireNativeComponent, StyleSheet, View, Platform } from 'react-native'
import ImageSourcePropType from 'react-native/Libraries/Image/ImageSourcePropType'
import StyleSheetPropType from 'react-native/Libraries/StyleSheet/StyleSheetPropType'
import StyleSheetValidation from 'react-native/Libraries/StyleSheet/StyleSheetValidation'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import DropdownStylePropType from './StylePropTypes'
import DropdownItemStylePropType from './ItemStylePropTypes'

export default class Dropdown extends Component {
  static propTypes = {
    ...View.propTypes,
    selectedValue: PropTypes.any,
    indicator: ImageSourcePropType,
    style: StyleSheetPropType(DropdownStylePropType),
    itemStyle: StyleSheetPropType(DropdownItemStylePropType),
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
    const { indicator } = this.props
    const { items, selectedIndex } = this.state
    // Transform styles to native props;
    const dropdownStyle = StyleSheet.flatten(this.props.style)
    const itemStyle = StyleSheet.flatten(this.props.itemStyle)
    const {
      borderWidth,
      borderColor,
      borderRadius,
      backgroundColor,
      separatorColor,
      separatorHeight,
      ...style
    } = dropdownStyle;
    const indicatorImage = indicator &&
      resolveAssetSource(indicator).uri

    if (Platform.OS === 'android') {
      return (
        <NativeDropdown
          ref={dropdown => this.dropdown = dropdown}
          style={[styles.dropdown, style]}
          items={items}
          selectedIndex={selectedIndex}
          cornerRadius={borderRadius}
          borderWidth={borderWidth}
          borderColor={borderColor}
          backgroundColor={backgroundColor}
          separatorColor={separatorColor}
          separatorHeight={separatorHeight}
          indicatorImageName={indicatorImage}
          fontName={itemStyle.fontFamily}
          fontSize={itemStyle.fontSize}
          textAlignment={itemStyle.textAlign}
          textColor={itemStyle.color}
          onChange={this.onChange}
        />
      );
    } else {
      return (
        <NativeDropdown
          ref={dropdown => this.dropdown = dropdown}
          style={[styles.dropdown, style]}
          items={items}
          selectedIndex={selectedIndex}
          cornerRadius={borderRadius}
          borderWidth={borderWidth}
          borderColor={borderColor}
          backgroundColor={backgroundColor}
          separatorColor={separatorColor}
          separatorHeight={separatorHeight}
          indicatorImage={indicator}
          fontName={itemStyle.fontFamily}
          fontSize={itemStyle.fontSize}
          textAlignment={itemStyle.textAlign}
          textColor={itemStyle.color}
          onChange={this.onChange}
        />
      );
    }
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

const styles = StyleSheet.create({
  dropdown: {
    // The dropdown will conform to whatever width is given, but we do
    // have to set the component's height explicitly on the
    // surrounding view to ensure it gets rendered.
    height: 40,
  },
})

// Register for our custom styles to prevent errors when
// `separatorColor` and `separatorHeight` are specified in style prop.
StyleSheetValidation.addValidStylePropTypes(DropdownStylePropType)

if (Platform.OS === 'android') {
  var NativeDropdown = requireNativeComponent('TipsiDropdown', Dropdown, {
    nativeOnly: {
      items: true,
      selectedIndex: true,
      indicatorImageName: true,
      backgroundColor: true,
      fontName: true,
      fontSize: true,
      textAlignment: true,
      separatorHeight: true,
      separatorColor: true,
      cornerRadius: true,
      borderWidth: true,
      borderColor: true,
      textColor: true,
    },
  });
} else {
  var NativeDropdown = requireNativeComponent('TipsiDropdown', Dropdown, {
    nativeOnly: {
      items: true,
      selectedIndex: true,
      indicatorImage: true,
      backgroundColor: true,
      fontFamily: true,
      fontSize: true,
      fontWeight: true,
      fontStyle: true,
      textAlignment: true,
      separatorHeight: true,
      separatorColor: true,
      cornerRadius: true,
      borderWidth: true,
      borderColor: true,
      textColor: true,
    },
  });
}
