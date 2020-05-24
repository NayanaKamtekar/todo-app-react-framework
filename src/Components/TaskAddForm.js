import React, { Component } from "react";

class TaskAddForm extends Component {
  render() {
    const {
      handleValueChange,
      handleDateChange,
      handleSubmit,
      handleAddTask,
      refForm,
      today
    } = this.props;
    console.log(today);
    return (
      // <form className= "list-group-item" ref={form => this.refForm = form}>
      <form className="list-group-item" ref={refForm}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="description">Task Description</label>
            <input
              type="text"
              onChange={handleValueChange}
              className="form-control"
              id="description"
              placeholder="Enter new task"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              onChange={handleDateChange}
              className="form-control"
              id="dueDate"
              min={today}
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={e => {
            handleSubmit(e);
            handleAddTask();
          }}
          className="btn btn-primary"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={e => {
            handleAddTask();
          }}
          className="btn btn-secondary ml-2"
        >
          Cancel
        </button>
      </form>
    );
  }
}

export default TaskAddForm;
