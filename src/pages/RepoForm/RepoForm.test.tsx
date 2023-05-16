import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RepoForm from './RepoForm';
import {BrowserRouter} from 'react-router-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

test('Submit is disabled on load', () => {
  render(<RepoForm />, {wrapper: BrowserRouter});
  const submitButton = screen.getByText(/Submit/i);
  expect(submitButton).toHaveAttribute('disabled');
});

test('Submit redirects to next page', () => {
    window.HTMLFormElement.prototype.submit = () => {}
    render(<RepoForm />, { wrapper: BrowserRouter });
    const userInput = screen.getByTestId("user");
    fireEvent.change(userInput, {target: {value: 'testorg'}})
    const repoInput = screen.getByTestId("repo");
    fireEvent.change(repoInput, {target: {value: 'testrepo'}})

    fireEvent.submit(screen.getByTestId("form"));
    expect(mockedUsedNavigate).toBeCalledWith('/testorg/testrepo');
});
