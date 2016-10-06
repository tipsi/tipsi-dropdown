import React, { Component, PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

const NativeDropdown = requireNativeComponent('TipsiDropdown', Dropdown);

export default class Dropdown extends Component {
  static propTypes = {
    ...View.propTypes,
    options: PropTypes.array,
    value: PropTypes.number,
    onChange: PropTypes.func,
    indicatorImageName: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontName: PropTypes.string,
    fontSize: PropTypes.number,
    textAlignment: PropTypes.string,
    cornerRadius: PropTypes.number,
    separatorHeight: PropTypes.number,
    separatorColor: PropTypes.string,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    textColor: PropTypes.string
  }

  render() {
    return (
      <NativeDropdown {...this.props} />
    );
  }
}
