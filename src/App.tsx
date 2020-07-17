import React from 'react';
import logo from './logo.svg';
import Hello from "./components/Hello";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Hello message="React"/>
      </header>
    </div>
  );
}

export default App;
