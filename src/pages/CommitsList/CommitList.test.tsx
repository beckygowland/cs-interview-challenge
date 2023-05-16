import React from 'react';
import { render, screen } from '@testing-library/react';
import CommitList from './CommitList';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import * as hooks from './hooks/usePaginatedCommitFetch'

test('Shows loading on page init', () => {
  render(<CommitList />, { wrapper: BrowserRouter });
  const submitButton = screen.getByText(/loading.../i);
  expect(submitButton).toBeInTheDocument();
});

test('Shows list of items', () => {
  jest.spyOn(hooks, 'usePaginatedCommitFetch').mockReturnValue({ fetchMoreCommits: () => {}, error: undefined, isLoading: false, data: [{ sha: "abc123", html_url: "http://url", commit: { message: "test message", author: {name: "Becky Gowland"} }, date: "utc" }] });
  // This router wrapper could be broken out into better testing boiler plate
  render(<MemoryRouter initialEntries={['/testUser/testRepoo']}>
    <CommitList />
  </MemoryRouter>);

  expect(screen.getByText(/test message/i)).toBeInTheDocument();
});

test('Shows unexpected error', () => {
  jest.spyOn(hooks, 'usePaginatedCommitFetch').mockReturnValue({ fetchMoreCommits: () => {}, error: new Error("Random"), isLoading: false, data: [] });
  // This router wrapper could be broken out into better testing boiler plate
  render(<MemoryRouter initialEntries={['/testUser/testRepoo']}>
    <CommitList />
  </MemoryRouter>);

  expect(screen.getByText(/An unexpected error occured/i)).toBeInTheDocument();
});

