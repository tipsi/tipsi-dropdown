'use strict';
import React, { Component, PropTypes } from 'react';
import { requireNativeComponent, View, DeviceEventEmitter } from 'react-native';

var NativeDropdown = requireNativeComponent('TipsiDropdown', Dropdown);

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  _onChange(event: Event) {
    if (!this.props.onItemChanged) {
      return;
    }
    this.props.onItemChanged(event);
  }

  componentWillMount() {
      DeviceEventEmitter.addListener('onItemChanged', this._onChange);
  }

  componentWillUnmount() {
      DeviceEventEmitter.removeListener('onItemChanged', this._onChange);
  }

  render() {
    return (
      <NativeDropdown
        {...this.props} onChange={this._onChange}
        items={this.props.items} selected={this.props.selected}
        styling={this.props.styling}/>
    );
  }
}

Dropdown.propTypes = {
  ...View.propTypes,
  items: PropTypes.array,
  styling: PropTypes.string,
  selected: PropTypes.number,
  onItemChanged: PropTypes.func
};

module.exports = Dropdown;
