import React from 'react';

const style = {
  opacity: 1,
  display: "block",
  width: "100%",
  height: "auto",
  transition: ".5s ease",
  "backface-visibility": "hidden"
};

export const Image = (props) => (
  <img
    src={props.imgUrl}
    alt="missing"
    style={{style, opacity: props.hover? 0.3 : 1}}
  />
)
