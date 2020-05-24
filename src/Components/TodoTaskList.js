import React, { Component } from "react";
import TodoTask from "./TodoTask";
import TodoTaskTitle from "./TodoTaskTitle";
import TaskAddForm from "./TaskAddForm";
import TaskEditForm from "./TaskEditForm";

export class TodoTaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      formShow: false,
      inputValue: "",
      inputDate: "",
      editInputValue: "",
      editInputDate: "",
      editKey: null,
      addDisabled: false,
      editDisabled: false,
      today: `${new Date().getFullYear().toString()}-${(new Date().getMonth() + 1).toString().padStart(2,'0')}-${new Date().getDate().toString().padStart(2,'0')}`
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleEditValueChange = this.handleEditValueChange.bind(this);
    this.handleEditDateChange = this.handleEditDateChange.bind(this);
    this.refForm = React.createRef();
  }

  handleEdit(key, description, deadline) {
    console.log(this.state);
    this.setState({
      editKey: key,
      editInputValue: description,
      editInputDate: deadline,
      addDisabled: !this.state.addDisabled
    });

    console.log(this.state);
  }

  handleEditValueChange(event) {
    this.setState({
      editInputValue: event.target.value
    });
  }

  handleEditDateChange(event) {
    this.setState({
      editInputDate: event.target.value
    });
    event.preventDefault();
  }

  handleEditSubmit(e) {
    console.log(this.state);
    if (this.state.editInputValue !== "" && this.state.editInputDate !== "") {
      console.log("Im here 1");
      const newTasks = this.state.tasks.map(task => {
        if (task.id === this.state.editKey) {
          console.log("Im here 2");
          task.description = this.state.editInputValue;
          task.deadline = this.state.editInputDate;
        }

        return task;
      });

      this.setState({
        editForm: false,
        editKey: null,
        editInputValue: "",
        editInputDate: "",
        tasks: newTasks,
        addDisabled: !this.state.addDisabled
      });

      this.refForm.current.reset();
    }

    e.preventDefault();
  }

  handleAddTask() {
    console.log(this.state.formShow);
    this.setState({
      formShow: !this.state.formShow,
      inputValue: "",
      inputDate: "",
      editDisabled: !this.state.editDisabled
    });
  }

  handleValueChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  handleDateChange(event) {
    this.setState({
      inputDate: event.target.value
    });
    event.preventDefault();
  }

  handleSubmit(event) {
    if (this.state.inputValue !== "" && this.state.inputDate !== "") {
      const currentTasks = this.state.tasks;
      const key = currentTasks.length + 1;
      const newTask = {
        id: key,
        description: this.state.inputValue,
        deadline: this.state.inputDate
      };
      this.setState({
        tasks: [...this.state.tasks, newTask],
        inputValue: "",
        inputDate: ""
      });

      this.refForm.current.reset();
    }

    console.log(this.state);
    console.log("handelSubmit");
    event.preventDefault();
  }

  handleDelete(key) {
    console.log("test called");
    console.log(key);
    const currentTasks = this.state.tasks;
    const newTasks = currentTasks.filter(elem => elem.id !== key);

    this.setState({
      tasks: newTasks,
      inputValue: "",
      inputDate: ""
    });
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw"
    )
      .then(res => res.json())
      .then(data => this.setState({ tasks: data }));
  }

  render() {
    const { tasks, editKey } = this.state;
    console.log(tasks);
    let listOfTask = tasks.map(task => {
      if (task.id === editKey) {
        return (
          <TaskEditForm
            key={task.id}
            handleEditValueChange={this.handleEditValueChange}
            handleEditDateChange={this.handleEditDateChange}
            handleEditSubmit={this.handleEditSubmit}
            refForm={this.refForm}
            task={task}
            today={this.state.today}
          />
        );
      } else {
        return (
          <TodoTask
            key={task.id}
            task={task}
            handler={this.handleDelete}
            handleEdit={this.handleEdit}
            clickDisable={this.state.editDisabled}
          />
        );
      }
    });

    if (listOfTask.length === 0) {
      listOfTask = (
        <li className="list-group-item text-warning h4">No items</li>
      );
    }

    let addTaskForm;
    if (this.state.formShow === true) {
      addTaskForm = (
        <TaskAddForm
          handleValueChange={this.handleValueChange}
          handleDateChange={this.handleDateChange}
          handleSubmit={this.handleSubmit}
          handleAddTask={this.handleAddTask}
          refForm={this.refForm}
          today={this.state.today}
        />
      );
    } else {
      addTaskForm = (
        <li
          className="list-group-item"
          style={this.state.addDisabled ? { pointerEvents: "none" } : {}}
        >
          <div className="row">
            <i
              className="material-icons align-top pr-1 text-success"
              style={{ cursor: "pointer" }}
              onClick={this.handleAddTask}
            >
              add_circle
            </i>
            <div className="col-10 pl-0 font-weight-light">Add Task</div>
          </div>
        </li>
      );
    }

    return (
      <div>
        <div className="container-fluid">
          <TodoTaskTitle />
        </div>
        <div className="container">
          <ul className="list-group list-group-flush">
            {listOfTask}
            {addTaskForm}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoTaskList;
