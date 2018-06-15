import React, {Component} from 'react';

import {CaptionOverlay} from "./common/CaptionOverlay";
import {Image} from "./basicWrappers/Image";

export default class PhotoGallery extends Component {

  state = {
    currentIndex: 0,
    showOverlay: false,
    left: 0,
    originalOffset: 0,
    touchStartX: 0,
    beingTouched: false,
  };

  // pay the price and create the handler on every render to save code dupe
  createNavigateButtonHandler = (incrementAmount) => (
    (e) => (
      this.setState(
        (prevState, props) => ({prevState, currentIndex: (props.imgCapArray.length + prevState.currentIndex + incrementAmount) % props.imgCapArray.length})
      )
    )
  );

  handleStart(clientX) {
    this.setState({
      originalOffset: this.state.left,
      touchStartX: clientX,
      beingTouched: true
    });
  }

  handleMove(clientX) {
    if (this.state.beingTouched) {
      let deltaX = clientX - this.state.touchStartX + this.state.originalOffset;
      console.log('deltax: ', deltaX)
      if (deltaX < -350) {
        this.createNavigateButtonHandler(-1)();
      } else if (deltaX > 350) {
        this.createNavigateButtonHandler(1)();
      }
      else {
        deltaX = 0;
      }
      this.setState({
        left: deltaX
      });
    }
  }

  handleEnd() {
    this.setState({
      touchStartX: 0,
      beingTouched: false,
      left: 0
    });
  }

  handleMouseDown(mouseDownEvent) {
    mouseDownEvent.preventDefault();
    this.handleStart(mouseDownEvent.clientX);
  }

  handleMouseMove(mouseMoveEvent) {
    this.handleMove(mouseMoveEvent.clientX);
  }

  handleMouseUp() {
    this.handleEnd();
  }

  onMouseEnter = () => {
    this.setState((prevState, props) => (Object.assign(prevState, {showOverlay: true})))
  }

  onMouseLeave = () => {
    this.setState((prevState, props) => (Object.assign(prevState, {showOverlay: false})))
  }

  render() {
    const imagesToRender = this.props.imgCapArray[this.state.currentIndex];
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={mouseDownEvent => this.handleMouseDown(mouseDownEvent)}
        onMouseMove={mouseMoveEvent => this.handleMouseMove(mouseMoveEvent)}
        onMouseUp={() => this.handleMouseUp()}
        style={{height: "100vh", width: "100vw", display:"block"}}
      >
          <Image
            imgUrl={imagesToRender.imgUrl}
            hover={this.state.showOverlay}
          />
          <CaptionOverlay
            captionText={imagesToRender.caption}
            onPrevButtonClick={this.createNavigateButtonHandler(-1)}
            onNextButtonClick={this.createNavigateButtonHandler(1)}
            hover={this.state.showOverlay}
          />

      </div>
    );
  }
}
