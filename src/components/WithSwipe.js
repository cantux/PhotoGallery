import React, {Component} from 'react';

export const WithSwipe = (DecoratedComponent) => {
  return class extends Component {
    state = {
      left: 0,
      originalOffset: 0,
      velocity: 0,
      timeOfLastDragEvent: 0,
      touchStartX: 0,
      prevTouchX: 0,
      beingTouched: false,
      height: 0,
      intervalId: null
    };

    handleStart(clientX) {
      if (this.state.intervalId !== null) {
        window.clearInterval(this.state.intervalId);
      }
      this.setState({
        originalOffset: this.state.left,
        velocity: 0,
        timeOfLastDragEvent: Date.now(),
        touchStartX: clientX,
        beingTouched: true,
        intervalId: null
      });
    }

    handleMove(clientX) {
      if (this.state.beingTouched) {
        const touchX = clientX;
        const currTime = Date.now();
        const elapsed = currTime - this.state.timeOfLastDragEvent;
        const velocity = 20 * (touchX - this.state.prevTouchX) / elapsed;
        let deltaX = touchX - this.state.touchStartX + this.state.originalOffset;
        if (deltaX < -250) {
          this.cmp.createNavigateButtonHandler(-1)();
        } else if (deltaX > 250) {
          this.cmp.createNavigateButtonHandler(1)();
        }
        else {
          deltaX = 0;
        }
        this.setState({
          left: deltaX,
          velocity,
          timeOfLastDragEvent: currTime,
          prevTouchX: touchX
        });
      }
    }

    handleEnd() {
      this.setState({
        velocity: this.state.velocity,
        touchStartX: 0,
        beingTouched: false,
        intervalId: window.setInterval(this.animateSlidingToZero.bind(this), 33)
      });
    }

    handleTouchStart(touchStartEvent) {
      touchStartEvent.preventDefault();
      this.handleMotionStart(touchStartEvent.targetTouches[0].clientX);
    }

    handleTouchMove(touchMoveEvent) {
      this.handleMove(touchMoveEvent.targetTouches[0].clientX);
    }

    handleTouchEnd() {
      this.handleEnd();
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

    render() {
      return (
        <DecoratedComponent
          ref={(c) => this.cmp = c}
          {...this.props}
          onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
          onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
          onTouchEnd={() => this.handleTouchEnd()}
          onMouseDown={mouseDownEvent => this.handleMouseDown(mouseDownEvent)}
          onMouseMove={mouseMoveEvent => this.handleMouseMove(mouseMoveEvent)}
          onMouseUp={() => this.handleMouseUp()}
        />
      )
    }
  }
}
