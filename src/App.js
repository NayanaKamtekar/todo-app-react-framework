import React from 'react';
import './App.css';
import TodoTaskList from './Components/TodoTaskList';

function App() {
  console.log('App rendered')
  return (
    <div>
    <TodoTaskList/>
    </div>
  );
}

export default App;
