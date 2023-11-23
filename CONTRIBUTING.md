# Contributing

This document outlines the guidelines for contributing to the project.

## Project Structure

This repository is a monorepo that contains multiple projects. The projects are located in the `apps` and `libs` folders.

### Apps

The `apps` folder contains the following projects:

| Name   | Description                                                        |
| ------ | ------------------------------------------------------------------ |
| `demo` | A demo application that showcases the libraries in this repository |

### Libraries

| Name          | Import path                              | Description                                                                                   |
| ------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| `composables` | [@bynary/composables](libs/composables/) | A set of composable functions to help you build Angular applications faster. Based on signals |

## Development Setup

This project uses [Nx](https://nx.dev) to manage the monorepo. Nx is a set of extensible dev tools for monorepos.
The package manager used is [NPM](https://www.npmjs.com/).

### Prerequisites

The recommended Node.js version is 20 or higher. You can use [nvm](https://github.com/nvm-sh/nvm) to manage multiple active Node.js versions.

### Installation

To install the dependencies, run `npm install`.

### Running the demo application

To run the demo application, run `nx serve demo`.

### Running the lint

To run the linter, run `nx lint <project-name>`.

### Running the tests

To run the tests, run `nx test <project-name>`.

### Building a project

To build a project, run `nx build <project-name>`.

### Formatting the code

To format the code, run `nx format`.

## Submission Guidelines

Whenever you are submitting a bug report, feature request, or pull request, please follow these guidelines.

### Submitting a new bug

Before you submit an issue, please search the issue tracker. An issue for your problem might already exist and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug, we need to reproduce and confirm it. In order to reproduce bugs, we require that you provide a minimal reproduction. Having a minimal reproducible scenario gives us a wealth of important information without going back and forth to you with additional questions.

A minimal reproduction allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.

You can file new issues by selecting from our [new issue templates](https://github.com/bynaryDE/angular-extensions/issues/new/choose) and filling out the issue template.

### Submitting a feature request

You can request a new feature by [submitting an issue](https://github.com/bynaryDE/angular-extensions/issues/new/choose) to our GitHub Repository.
Please provide as much detail and context as possible.

### Submitting a pull request

Before you submit your Pull Request (PR) consider the following guidelines:

-   Search GitHub for an open or closed PR that relates to your submission. You don't want to duplicate existing efforts.
-   Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add. Discussing the design upfront helps to ensure that we're ready to accept your work.
-   Pull requests should target the `develop` branch.

#### Code requirements

To ensure consistency throughout the source code, keep these rules in mind as you are working:

-   All features or bug fixes must be tested by one or more specs (unit-tests).
-   All public API methods must be documented.
-   The changes must pass lint, tests and build checks.

#### Commit message guidelines

This project uses conventional commits to enforce a standard commit format. Please read more about it [here](https://www.conventionalcommits.org/en/v1.0.0/).
Our conventional commit configuration is based on `@commitlint/config-conventional`

The commit message should follow the following format:

```
<type>(<scope>): <summary>
<BLANK LINE>
body
```

##### Type

The `<type>` must be one of the following:

-   **feat**: A new feature
-   **fix**: A bug fix
-   **docs**: Documentation only changes
-   **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
-   **refactor**: A code change that neither fixes a bug nor adds a feature
-   **perf**: A code change that improves performance
-   **test**: Adding missing tests or correcting existing tests
-   **build**: Changes that affect the build system or external dependencies (example scopes: deps)
-   **ci**: Changes to our CI configuration files and scripts
-   **chore**: Other changes that don't modify src or test file
-   **revert**: Reverts a previous commit

##### Scope

The `<scope>` should be the name of the project affected or a general scope:

| Type      | Scope           | Description                                            |
| --------- | --------------- | ------------------------------------------------------ |
| \* (any)  | **composables** | for changes that affect the `libs/composables` project |
| \* (any)  | **demo**        | for changes that affect the `apps/demo` project        |
| **build** | **deps**        | for dependency updates                                 |

##### Summary

Use the summary field to provide a succinct description of the change:

-   use the imperative, present tense: "change" not "changed" nor "changes"
-   don't capitalize the first letter
-   no dot (.) at the end

#### Pull request description

The description of the pull request should contain a link to the issue that is being fixed.
For visual changes, please include a screenshot of the change.

## Contributing to documentation

The main source of documentation alongside the README.md files is extracted from JSDoc comments in the source code.
To update the documentation, you need to update the JSDoc comments in the source code and run `npm run generate-dcs` to generate the documentation.
This will update the `docs` folder with the latest documentation.

When a pull request is merged into the `main` branch, the documentation will be automatically deployed to the [wiki](https://github.com/bynaryDE/angular-extensions/wiki).
