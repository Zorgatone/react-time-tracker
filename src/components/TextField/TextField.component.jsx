import React, { Component } from 'react';
import { classNames } from '../../utilities/classNames';

export class TextField extends Component {

  constructor() {
    super();

    this.getRef = this.getRef.bind(this);
  }

  componentDidMount() {
    this.hideValue();
  }

  componentDidUpdate() {
    this.hideValue();
  }

  getRef(ref) {
    this.textField = ref;
  }

  hideValue() {
    const isSecure = this.props.secure || (
      'string' === typeof this.props.type && this.props.type.toLowerCase()
      === 'password'
    );

    if (isSecure) {
      this.textField.removeAttribute('value');
    }
  }

  render() {
    const p = Object.assign({
      type: 'text'
    }, this.props);

    const className = classNames(this.props.className);
    delete p.className;
    delete p.secure;

    return (
      <input ref={this.getRef} className={className} {...p} />
    );
  }

}

export default TextField;
