import React, { Component } from "react";

class TodoTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      isEditMode: false
    };

    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  handleEditMode() {
    this.setState({isEditMode:!this.state.isEditMode})
  }

  render() {
    const {
      task: { id },
      task: { description },
      task: { deadline },
      clickDisable
    } = this.props;
    const deadlineString = new Date(deadline).toDateString();


    return (
      <li className="list-group-item">
        <div 
          className="row"
          style={
            clickDisable ? { pointerEvents: 'none' } : {}
          }  
        >
          <div className="col-10 col-sm-4">
            <input
              type="checkbox"
              className="form-check-input align-bottom"
              data-toggle="tooltip"
              title="Mark Complete"
              id="check"
              defaultChecked={this.state.isChecked}
              onChange={this.handleCheck}
            />
            <label
              className="form-check-label align-top"
              style={
                this.state.isChecked ? { textDecoration: "line-through" } : { }
              }
              htmlFor="check"
            >
              {description} , {deadlineString}
            </label>
          </div>
          <div className="col-1">
            <i
              className="material-icons align-top text-warning"
              data-toggle="tooltip"
              title="Edit Task"
              style={{ cursor: "pointer" }}
              onClick={() => this.props.handleEdit(id, description, deadline)}
            >
              edit
            </i> 
          </div>
          <div className="col-1">
            <i
              className="material-icons align-top text-danger"
              data-toggle="tooltip"
              title="Delete Task"
              style={{ cursor: "pointer" }}
              onClick={() => this.props.handler(id)}
            >
              remove_circle
            </i>
          </div>           
        </div>
      </li>
      
    );
  }
}

export default TodoTask;
