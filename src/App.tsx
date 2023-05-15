import React from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './Router';

function App() {
  // normally I would scaffold context in this file
  // EG. user context, global styling, api context, 3rd party package context
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
