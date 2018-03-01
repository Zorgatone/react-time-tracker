import React from 'react';
import { classNames } from '../../utilities/classNames';

import './Btn.style.css';

export const Btn = (props) => (
  <button
    className={classNames('button', props.className, {
      'button-primary': !!props.primary,
      'button-secondary': !!props.secondary
    })}
    onClick={props.onClick}
    type={props.type || 'button'}
  >
    {props.children}
  </button>
);

export default Btn;
