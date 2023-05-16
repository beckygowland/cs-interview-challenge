import React from 'react';
import { Octokit } from 'octokit';
import { createContext, useContext } from 'react';

// https://github.com/octokit/core.js#readme  
function createGithubAPI(token: string) {
    return new Octokit({
        auth: token
      })
}

const GithubApiContext = createContext(createGithubAPI(""));

interface ProviderProps {
  token: string;
  children: React.ReactNode
}
export const GithubApiContextProvider = ({token, children}: ProviderProps) => {
  return (
    <GithubApiContext.Provider value={createGithubAPI(token)}>
      {children}
    </GithubApiContext.Provider>
    )
    
}

export const useGithubApi = () =>  useContext(GithubApiContext)