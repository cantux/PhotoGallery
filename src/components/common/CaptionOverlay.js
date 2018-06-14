import React from 'react';
import {IconButton} from "./IconButton";

const style = {
  transition: ".5s ease",
  opacity: 0,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "-ms-transform": "translate(-50%, -50%)",
  "text-align": "center"
};

export const CaptionOverlay = (props) => (
  <div style={{style, opacity: props.hover ? 1 : 0}}>
    <IconButton
      clickHandler={props.onPrevButtonClick}
      classesString={"fa fa-arrow-left fa-3x"}
      style={{color: "black"}}
    />
    {props.captionText}
    <IconButton
      clickHandler={props.onNextButtonClick}
      classesString={"fa fa-arrow-right fa-3x"}
      style={{color: "black"}}
    />
  </div>
);
