import React from 'react';

const defaultProps = {
  classesString: "fas fa-arrow-left fa-3x",
  style: {
    color: 'black'
  }
};

export const IconButton = (props = { defaultProps }) => (
  <a onClick={props.clickHandler}>
    <i className={props.classesString} style={props.style}/>
  </a>
);
