import React from 'react'
import logo from './logo.svg'
import Create from "./pages/gallery/create"
import Gallery from "./pages/gallery/gallery"
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section className="App-content">
        <Create message="React"/>
      </section>
      <main>
        <Gallery />
      </main>
    </div>
  );
}

export default App;
