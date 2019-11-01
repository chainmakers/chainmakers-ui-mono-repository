## Release Process

### 1. Create a new version

- Update `AUTHORS`

  ```
  npm run update-authors
  ```

  Commit if necessary. The commit message should be "authors".

- Write the changelog

  You can use `git log --oneline <last version tag>..HEAD` to get a list of changes.

  Summarize them concisely in `CHANGELOG.md`. The commit message should be "changelog".

- Update the version

  ```
  npm version [major|minor|patch]
  ```

  This creates both a commit and a git tag.

- Make a PR

  Once the PR is reviewed, merge it:

  ```
  git push origin <branch-name>:master
  ```

  This makes it so that the commit hash on master matches the commit hash of the version tag.

  Finally, run:

  ```
  git push --tags
  ```

### 2. Create the release binaries

- On a Mac:

  ```
  npm run package:mac
  npm run package:linux
  ```

- On Windows, or in a Windows VM:

  ```
  npm run package:win
  ```

- Then, upload the release binaries to Github.

  ```
  latest.yml
  latest-mac.yml
  latest-linux.yml
  dicoapp-e_0.1.15_amd64.deb
  dICOApp-0.1.15.dmg
  dICOApp Setup 0.1.15.exe
  ```

### 3. Test it

**This is the most important part.**

- Manually download the binaries for each platform from Github.

  **Do not use your locally built binaries.** Modern OSs treat executables differently if they've
  been downloaded, even though the files are byte for byte identical. This ensures that the
  codesigning worked and is valid.

- Smoke test Application on each platform.

### 4. Ship it

- Create a pull request in [dicoapp-e](https://github.com/particle4dev/dicoapp-e/). The new version will be release after this PR is merged. **Merge with care.**

## Smoke Tests

Before a release, check that the following basic use cases work correctly:

1. Try to "Login" with your passphrase

- Ensure that you logged in the application without any error.
