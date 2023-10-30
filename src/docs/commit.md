## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to
more readable messages that are easy to follow when looking through the project history. But also,
we use the git commit messages to generate the OnJourneyGov change log.
So it's important to keep them as clean and informative as possible.
The guidelines we follow is based on [Conventional Commits](https://conventionalcommits.org/).

- `build`: Build related changes (eg: npm related/ adding external dependencies)
- `chore`: A code change that external user won't see (eg: change to .gitignore file or .prettierrc file)
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation related changes
- `refactor`: A code that neither fix bug nor adds a feature. (eg: You can use this when there is semantic changes like renaming a variable/ function name)
- `perf`: A code that improves performance
- `style`: A code that is related to styling
- `test`: Adding new test or making changes to existing test
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- `revert`: Reverts a previous commit

Example of good commit message:

> feat: add user authentication

```
 feat(shopping cart): add the amazing button
```

```
 feat: remove ticket list endpoint

 refers to JIRA-1337
 BREAKING CHANGES: ticket enpoints no longer supports list all entites.
```

```
 fix: add missing parameter to service call

 The error occurred because of <reasons>.
```

```
 build(release): bump version to 1.0.0
```

```
 build: update dependencies
```

```
 refactor: implement calculation method as recursion
```

```
 style: remove empty line
```

More? you can [read more here.](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)
