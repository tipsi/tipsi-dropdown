import React, { Component, PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

var NativeDropdown = requireNativeComponent('TipsiDropdown', Dropdown);

export default class Dropdown extends React.Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  _onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.nativeEvent);
    }
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
  items: PropTypes.array.isRequired,
  styling: PropTypes.string,
  selected: PropTypes.number,
  onChange: PropTypes.func
};

Dropdown.defaultProps = {
  values: [ '' ],
  selected: 0
}

module.exports = Dropdown;
