import React, {Component} from 'react';

import {CaptionOverlay} from "./common/CaptionOverlay";
import {Image} from "./basicWrappers/Image";

export default class PhotoGallery extends Component {

  state = {
    currentIndex: 0,
    showOverlay: false
  };

  // Lisp
  createNavigateButtonHandler = (incrementAmount) => (
    (e) => (
      this.setState(
        (prevState, props) => ({prevState, currentIndex: (props.imgCapArray.length + prevState.currentIndex + incrementAmount) % props.imgCapArray.length})
      )
    )
  );

  /**
   * Style update will work faster than switching components but let's try react way.
   */
  onMouseEnter = () => {
    this.setState((prevState, props) => (Object.assign(prevState, {showOverlay: true})))
  }

  onMouseLeave = () => {
    this.setState((prevState, props) => (Object.assign(prevState, {showOverlay: false})))
  }

  render() {
    const imagesToRender = this.props.imgCapArray[this.state.currentIndex];
    return (
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {
          !this.state.showOverlay
            ? <Image imgUrl={imagesToRender.imgUrl}/>
            : <CaptionOverlay
                captionText={imagesToRender.caption}
                onPrevButtonClick={this.createNavigateButtonHandler(-1)}
                onNextButtonClick={this.createNavigateButtonHandler(1)}
              />
        }
      </div>
    );
  }
}
