## How to contribute to this project

- [Git Configuration](#git-configuration)

- [Development Process](#development-process)

- [Labels on git](#labels-on-git)

- [Git Rules](#git-rules)

### Git Configuration

Before you start contribute to this project, your local git should be configured with:

- `git config user.email {your email}`

- `git config user.name "{your full name in English} ({your username})"`

- `git config branch.master.rebase true`

- `git config branch.develop.rebase true`

or short syntax

```
git config user.email {your email} &&

git config user.name "{your full name in English} ({your username})" &&

git config branch.master.rebase true &&

git config branch.develop.rebase true
```

For example:

```
git config user.email particle4dev@gmail.com &&

git config user.name "Nam Hoang (particle4dev)" &&

git config branch.master.rebase true &&

git config branch.develop.rebase true
```

### Development process

1. Create a branch corresponds to the story from master branch

- Name as `{story ID}-{hyphen-delimited lowercase story title without punctuations}`

2. Create an empty commit on this branch

- Put `[started story ID] [skip ci] {story title} {story URL}` at the first line of the commit comment (this starts the story on github issue)

Example

```
$ git commit --allow-empty -m "[started #23] [skip ci] 23-user-should-know-how-to-develop-a-feature https://github.com/KomodoPlatform/dicoapp-e/issues/23"
```

3. Push the commit

4. Create a pull request on the branch to the master branch

- Title the same as the story title
- Add `wip` and `spec` labels
- Assign your self to the pull request
- Fill out the description by following this [form](../.github/PULL_REQUEST_TEMPLATE.md)

5. Add an activity comment with a link to the pull request to the story

NOTE: You can skip this step if you use github issues. Github will link it together in automatically.

6. Work on the branch for the story with local commits until ready for specification review

- Prepare application code skeletons based on the specifications

- Implement unit tests based on the skeletons Squash all local commit into one

7. Squash all local commit into one

```
$ git rebase -i HEAD~2
pick d095cf5 write skeletons test 1
squash 36b1973 write skeletons test 2
```

8. After finish the test, you should rebase your current branch with develop branch so that your branch is not far from develop branch.

```
$ git fetch origin
$ git rebase origin/develop
```

9. Push your local tests to feature branch.

10. Remove `wip` label from the pull request and add `review` label

- Get 2 review approvals for the pull request
- If changes requested, add `wip` label to the pull request and remove `review` label, and go back to step 6

11. Work on the branch for the story with local commits until ready for implementation review

- Implement application codes based on the skeletons to pass all the tests

12. Squash all local commit into one

Put `[finished story ID] {story title} {story URL}` at the first line of the commit comment

```
$ git rebase -i HEAD~2
pick d095cf5 implement application codes 1
squash 36b1973 implement application codes 2

[finished #23] 23-user-should-know-how-to-develop-a-feature https://github.com/KomodoPlatform/dicoapp-e/issues/23
```

13. Push your local tests to feature branch.

14. After finish the implement, you should rebase your current branch with develop branch so that your branch is not far from develop branch.

```
$ git fetch origin
$ git rebase origin/develop
```

15. Confirm CI and automated code review passed on the pull request - if failed go back to step 11

16. Remove `wip` label from the pull request and add `review` label

17. Get 2 review approvals for the pull request

- If changes requested, add `wip` label to the pull request and remove `review` label, and go back to step 11

18. Remove `impl` label from the pull request

19. Add a comment containing `[delivered story ID]` to the pull request

20. Merge the pull request in "Squash and merge" mode

- This should deploy develop to staging automatically

21. Delete the branch

### Labels on git

#### status of issues

- wip (work in progress) (#428BCA)

Issues that are actively being worked on by a developer

- impl (implementations) (#8E44AD)

Implement application codes based on the skeletons to pass all the tests

- spec (specification) (#69D100)

Implement unit tests based on the skeletons

- review (review) (#5843AD)

Issues that are undergoing code review by the development team and/or undergoing design review by the UX team

#### type of issues

- bug (bug) (#FF0000)

Bugs represent unintended behavior that can be related to story.

- story (story) (#F0AD4E)

Story provide verifiable business value to the team’s customer.

#### other labels

- needs design (#AD4363)

Adding a label needs design so your designers can view the story and get context to unblock the story

- needs pm (#44AD8E)

Adding a label needs PM so you can view the story and remember context to unblock the story

- accept for merge (#5CB85C)

Merge requests that are ready for merge.

- reject for merge (#CC0033)

Merge requests that are reject for merge. The reason are in comment section.

- technical debt(technical debt) (#748182)

Issues related to things that need improvement and that have been left behind due to high velocity of development

- ux debt (ux debt) (#748182)

User experience improvement(s) that weren't fully implemented or could be refined after implementation

- ui (ui) (#69D100)

Issues related to create UI components

- ux (ux) (#3CA383)

Issues related to create UX

- discussion (discussion) (#5843AD)

Issues for the Discussion team. Covers New Features, Issues, Merge Requests, Markdown, etc view merge requests view open issues

- api (api) (#6E00AE)

Issues related to the API

- duplicate (duplicate) (#cfd3d7)

This issue or pull request already exists

- help wanted (help wanted) (#008672)

Extra attention is needed

### Git rules

#### Protected branches

Protected branches ensure that collaborators on your repository cannot make irrevocable changes to branches. These branches can also be protected by requiring pull requests to have at least one approved review before they can be merged.

- Develop

- Master

#### Update your local develop branch

Update your local develop branch and do an interactive rebase before pushing your feature and making a Pull Request.

Rebasing will merge in the requested branch (master or develop) and apply the commits that you have made locally to the top of the history without creating a merge commit (assuming there were no conflicts). Resulting in a nice and clean history.

#### Delete local and remote feature branches after merging.

It will clutter up your list of branches with dead branches. It ensures you only ever merge the branch back into (master or develop) once. Feature branches should only exist while the work is still in progress.

#### Before making a Pull Request, make sure your feature branch builds successfully and passes all tests (including code style checks).

You are about to add your code to a stable branch. If your feature-branch tests fail, there is a high chance that your destination branch build will fail too. Additionally, you need to apply code style check before making a Pull Request. It aids readability and reduces the chance of formatting fixes being mingled in with actual changes.

[This proposal is still under review, it should/will be more simpler in future. This proposal is also open so we alway welcome if you want to contribute.]
