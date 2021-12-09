import React from "react";
import ReactDOM from "react-dom";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsedTime: null
    };

    this.countUp = this.countUp.bind(this);
    this.startCounting = this.startCounting.bind(this);
  }

  startCounting() {
    setInterval(this.countUp, 1000);
  }

  countUp() {
    this.setState(({ elapsedTime }) => ({ elapsedTime: elapsedTime + 1 }));
  }

  render() {
    return (
      <div>
        <div>{this.state.elapsedTime}</div>
      </div>
    );
  }
}

export default Timer;
