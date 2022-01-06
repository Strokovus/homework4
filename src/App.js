import './App.css';
import { React, useState } from 'react'
import Postform from './pages/post';
import Getform from './pages/get';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>HTTP Requests</p>
        <Router>
          <Postform/>
          <Getform/>
        </Router>
      </header>
      
    </div>
  );
}

export default App;
