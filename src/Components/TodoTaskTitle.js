import React, { Component } from "react";

class TodoTaskTitle extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      timer: 0,
      min: 0,
      sec: 0
    }
  }

  componentDidMount() {
    setInterval(() => {
        let newTimer = this.state.timer + 1;
        let newMin = Math.floor(newTimer / 60);
        let newSec = newTimer % 60;
      
        this.setState({
          timer: newTimer,
          min: newMin,
          sec: newSec
        })
      }
      , 1000
    )
  }
  
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">ToDo List</span>
        <span>You have used {this.state.min.toString().padStart(2,'0')}:{this.state.sec.toString().padStart(2,'0')}</span>
      </nav>
    );
  }
}

export default TodoTaskTitle;
