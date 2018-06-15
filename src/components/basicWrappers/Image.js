import React from 'react';

const style = {
  opacity: 1,
  display: "block",
  "max-width": "100%",
  "max-height": "100%",
  transition: ".5s ease",
  "backface-visibility": "hidden",
  "object-fit": "contain"
};

export const Image = (props) => (
  <img
    src={props.imgUrl}
    alt="missing"
    style={{style, opacity: props.hover? 0.3 : 1}}
  />
)
