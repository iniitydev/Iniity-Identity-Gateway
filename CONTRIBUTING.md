# Contributing to the Iniity Control Plane

First off, thank you for considering contributing to Iniity. It's people like you that make this project a revolutionary tool for the future of identity. We welcome any form of contribution, from reporting bugs and suggesting features to writing code and improving documentation.

This document provides a set of guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md). Please read it before you start.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/your-username/iniity-platform/issues). If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/your-username/iniity-platform/issues/new). Be sure to include a clear title, a detailed description, and steps to reproduce the issue.

### Suggesting Enhancements

If you have an idea for an enhancement, please open an issue with a clear title and a detailed description of your suggestion and its potential value to the project.

### Code Contributions

We love code contributions! If you're ready to submit code, please follow the workflow below.

#### Development Setup

1.  Fork the repository to your own GitHub account.
2.  Clone your fork to your local machine: `git clone https://github.com/YOUR_USERNAME/iniity-platform.git`
3.  Navigate to the project directory: `cd iniity-platform`
4.  Install all dependencies: `npm install`
5.  Set up your `.env` file in the `webapp` directory as described in the main `README.md`.
6.  Run the web application in development mode: `npm run dev:webapp`

#### Contribution Workflow

1.  **Create a Branch:** Create a new branch from `main` for your feature or bugfix. Please use a descriptive branch name.
    -   For features: `git checkout -b feat/my-new-feature`
    -   For bugfixes: `git checkout -b fix/correct-that-bug`

2.  **Make Changes:** Write your code. Ensure it follows the existing code style and that all tests pass.

3.  **Commit Your Changes:** We use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for our commit messages. This helps us automate changelogs and makes the project history easier to read.
    -   `feat:` A new feature.
    -   `fix:` A bug fix.
    -   `docs:` Documentation only changes.
    -   `style:` Changes that do not affect the meaning of the code (white-space, formatting, etc).
    -   `refactor:` A code change that neither fixes a bug nor adds a feature.
    -   `perf:` A code change that improves performance.
    -   `test:` Adding missing tests or correcting existing tests.
    -   `chore:` Changes to the build process or auxiliary tools.

    Example: `git commit -m "feat(policy): Add support for time-based conditions"`

4.  **Push and Open a Pull Request:** Push your branch to your fork and open a Pull Request (PR) against the `main` branch of the original repository. Provide a clear title and a detailed description of the changes in your PR.

Thank you for your contribution!