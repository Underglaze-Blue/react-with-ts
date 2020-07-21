import React from 'react'
import Create from "./pages/gallery/create"
import Gallery from "./pages/gallery/gallery"
import './App.css'
import Poetry from "./pages/poetry/poetry";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Poetry />
        <Create message="React"/>
      </header>
      <main>
        <Gallery />
      </main>
    </div>
  );
}

export default App;
