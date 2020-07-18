import React from 'react';
import logo from './logo.svg';
import Hello from "./components/Hello";
import ImageList from "./components/Image";
import store from './store/store'
import './App.css';
import {Provider} from "react-redux";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section className="App-content">
        <Provider store={store}>
          <Hello message="React"/>
        </Provider>
      </section>
      <main>
        <Provider store={store}>
          <ImageList/>
        </Provider>
      </main>
    </div>
  );
}

export default App;
