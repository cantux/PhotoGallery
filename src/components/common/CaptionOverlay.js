import React from 'react';
import {IconButton} from "./IconButton";

export const CaptionOverlay = (props) => (
  <div>
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
