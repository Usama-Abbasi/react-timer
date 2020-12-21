import React, { Component } from 'react';
import './Timer.css';
import TimerButton from '../TimerButton/TimerButton';
type TimerState = {
  minutes: number,
  seconds: number,
  isOn: boolean
}

class Timer extends Component<{}, TimerState> {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 25,
      seconds: 0,
      isOn: false
    }
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);


  }

  myInterval: any;
  startTimer() {
    if (this.state.isOn === true) {
      return;
    }
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
    this.setState({ isOn: true });
  }

  stopTimer() {
    clearInterval(this.myInterval);
    this.setState({ isOn: false });
  }

  resetTimer() {
    this.stopTimer();
    this.setState({
      minutes: 25,
      seconds: 0,
      isOn: false
    });
  }


  render() {
    const { minutes, seconds } = this.state;

    return (
      <div className="timer-container">
        <div className="time-display">
          {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="timer-button-container">
          <TimerButton
            buttonAction={this.startTimer}
            buttonValue={'Start'}
          />
          <TimerButton
            buttonAction={this.stopTimer}
            buttonValue={'Stop'}
          />
          <TimerButton
            buttonAction={this.resetTimer}
            buttonValue={'Reset'}
          />
        </div>
      </div>
    );
  }
}

export default Timer;