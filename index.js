import React, { Component, PropTypes } from 'react'
import { requireNativeComponent, View } from 'react-native'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import ImageSourcePropType from 'react-native/Libraries/Image/ImageSourcePropType'

export default class Dropdown extends Component {
  static propTypes = {
    ...View.propTypes,
    value: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    indicatorImage: ImageSourcePropType,
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
  }

  render() {
    const { indicatorImage, ...props } = this.props
    const indicatorImageName = indicatorImage &&
      resolveAssetSource(indicatorImage).uri

    return (
      <NativeDropdown
        indicatorImageName={indicatorImageName}
        {...props}
      />
    )
  }
}

const NativeDropdown = requireNativeComponent('TipsiDropdown', Dropdown, {
  nativeOnly: {
    indicatorImageName: true,
  },
})
