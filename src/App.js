import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App () {
  
  const [state, setState] = useState({name: ""})

 const handleChange = (event) => {
   setState({ name: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(state.name)}`)
      .then(response => response.json())
      .then(data => setState(data));
  }

  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={state.name}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{state.greeting}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  
}

export default App;
