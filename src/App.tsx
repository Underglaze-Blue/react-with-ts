import React from 'react';
import logo from './logo.svg';
import Hello from "./components/Hello";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section className="App-content">
        <Hello message="React"/>
      </section>
    </div>
  );
}

export default App;
