'use strict';
import React, { Component, PropTypes } from 'react';
import { requireNativeComponent, View, DeviceEventEmitter } from 'react-native';

var NativeDropdown = requireNativeComponent('TipsiDropdown', Dropdown);

export default class Dropdown extends React.Component {
  static propTypes = {
    ...View.propTypes,
    options: PropTypes.array,
    value: PropTypes.number,
    onChange: PropTypes.func,
    style: PropTypes.shape({
      indicatorImageName: PropTypes.style,
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
    })
  }

  static defaultProps = {
    onChange: (event) => { console.log(event.nativeEvent); }
  }

  render() {
    return (
      <NativeDropdown
        {...this.props}
        onChange={this.props.onChange}
        options={this.props.items}
        value={this.props.selected}
        style={this.props.style}
        indicatorImageName={this.props.style.indicatorImageName}
        fontName={this.props.style.fontName}
        fontSize={this.props.style.fontSize}
        textAlignment={this.props.style.textAlignment}
        cornerRadius={this.props.style.cornerRadius}
        separatorHeight={this.props.style.separatorHeight}
        separatorColor={this.props.style.separatorColor}
        borderWidth={this.props.style.borderWidth}
        borderColor={this.props.style.borderColor}
        textColor={this.props.style.textColor}
        />
    );
  }
}
