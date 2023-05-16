import React from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './Router';
import { GithubApiContextProvider } from './utils/githubApi/githubApi';

function App() {
  // normally there would be much more scaffold in this file for all the needed contexts
  // EG. user context, global styling, api context, 3rd party package context
  return (
    <div className="App">
      <GithubApiContextProvider token="github_pat_ADD_TOKEN_HERE">
        <Router />
      </GithubApiContextProvider>
    </div>
  );
}

export default App;
