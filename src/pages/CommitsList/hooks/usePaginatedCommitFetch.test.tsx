import React from 'react';
import { render, screen, fireEvent, within, waitFor, act } from '@testing-library/react';
import { usePaginatedCommitFetch } from './usePaginatedCommitFetch'
import * as api from '../../../utils/githubApi/githubApi';

test('Returns loading on init', () => {
  const mock = jest.fn(() => new Promise(() => { }))
  jest.spyOn(api, 'useGithubApi').mockReturnValue(getMockOctokit(mock));
  render(<PaginatedCommitFetch user="a" repo="b" />);

  const dataTxt = within(screen.getByTestId("data"));
  expect(dataTxt.getByText("0")).toBeInTheDocument();
  const loadingTxt = within(screen.getByTestId("loading"));
  expect(loadingTxt.getByText("true")).toBeInTheDocument();
});

test('Returns data', async () => {
  const mock = jest.fn(() => Promise.resolve({ data: [{ id: 1, name: "mock item" }] }))
  jest.spyOn(api, 'useGithubApi').mockReturnValue(getMockOctokit(mock));
  render(<PaginatedCommitFetch user="a" repo="b" />);

  await waitFor(() => {
    const dataTxt = within(screen.getByTestId("data"));
    expect(dataTxt.getByText("1")).toBeInTheDocument();
    const loadingTxt = within(screen.getByTestId("loading"));
    expect(loadingTxt.getByText("false")).toBeInTheDocument();
  })
});

test('Returns error', async () => {
  const mock = jest.fn(() => Promise.reject(new Error("made up error")))
  jest.spyOn(api, 'useGithubApi').mockReturnValue(getMockOctokit(mock));
  render(<PaginatedCommitFetch user="a" repo="b" />);

  await waitFor(() => {
    const errTxt = within(screen.getByTestId("error"));
    expect(errTxt.getByText("made up error")).toBeInTheDocument();
  })
});

test('fetches more data', async () => {
  const mock = jest.fn()
  mock
    .mockReturnValueOnce(Promise.resolve({data: [{id: 1, name: "mock item"}]}))
    .mockReturnValueOnce(Promise.resolve({data: [{id: 2, name: "other mock item"}]}))
  jest.spyOn(api, 'useGithubApi').mockReturnValue(getMockOctokit(mock));
  render(<PaginatedCommitFetch user="a" repo="b" />);

  await waitFor(() => {
    const dataTxt = within(screen.getByTestId("data"));
    expect(dataTxt.getByText("1")).toBeInTheDocument();
  })

  act(() => {
    fireEvent.click(screen.getByText(/fetch/i))
  })

  await waitFor(() => {
    const dataTxt = within(screen.getByTestId("data"));
    expect(dataTxt.getByText("2")).toBeInTheDocument();
  })
});

// This could be better mocked with 3rd party hook testing packages like react-hooks-testing-library
function PaginatedCommitFetch({ user, repo }: { user: string, repo: string }) {
  const { error, data, isLoading, fetchMoreCommits } = usePaginatedCommitFetch(user, repo);

  return (
    <div>
      <div data-testid="error">
        {error?.message}
      </div>
      <div data-testid="data">
        {data.length}
      </div>
      <div data-testid="loading">
        {isLoading.toString()}
      </div>
      <button data-testid="fetchMore" onClick={fetchMoreCommits}>
        fetch more
      </button>
    </div>
  )
}

function getMockOctokit(mock: jest.Mock) {
  return { request: mock } as unknown as any
}