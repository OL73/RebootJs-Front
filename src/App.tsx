import React from 'react';
import './App.css';
import Todos from './components/todos';
import Users from './components/users';

function App() {
  return (
    <div className="container">
        <Todos />
        <Users />
    </div>
  );
}

export default App;
