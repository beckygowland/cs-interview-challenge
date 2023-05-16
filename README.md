### Development

Before starting, create a personal github access token as described [https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token](here)

Once created, replace `github_pat_ADD_TOKEN_HERE` with your token in the App.tsx files, line 12. In a production environment this would be put into some type of .env file so that it's not accidently committed.

Once replaced, run
`yarn install && yarn start` to start the local dev environment

### Testing

run `yarn test` to launch tests

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### 3rd party libraries
Octokit: used to make requests to the github api
MomentJS: to ease the nightmare that is date formatting

### Future work
- stricter typing, and including 3rd party packages to keep up with api types
- more scaffolding for testing best practices and to write tests with more coverage & to build them out faster
- bring in a components library to setup css/theming across the app as well as richer out of the box features. Would assist with css naming so that there are no collisions/clobbering


