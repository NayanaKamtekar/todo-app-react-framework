import React, { Component } from "react";

class TaskEditForm extends Component {
  render() {
    const {
      handleEditValueChange,
      handleEditDateChange,
      handleEditSubmit,
      refForm,
      task,
      today
    } = this.props;
    return (
      // <form className= "list-group-item" ref={form => this.refForm = form}>
      <form className="list-group-item" ref={refForm}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="description">Task Description</label>
            <input
              type="text"
              onChange={e => { handleEditValueChange(e) }}
              className="form-control"
              id="description"
              defaultValue={task.description}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              onChange={e => { handleEditDateChange(e) }}
              className="form-control"
              id="dueDate"
              defaultValue={task.deadline}
              min={today}
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={e => {
            handleEditSubmit(e);
            
          }}
          className="btn btn-primary"
        >
          Save Task
        </button>
        <button
          type="button"
          onClick={e => {
            handleEditSubmit(e);
          }}
          className="btn btn-secondary ml-2"
        >
          Cancel
        </button>
      </form>
    );
  }
}

export default TaskEditForm;
