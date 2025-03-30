# Project Overview

This application is built using React, TypeScript, and Vite, providing a modern development environment with Hot Module Replacement (HMR) and ShadcnUI for easy building.

## Folder Structure

The `src` directory contains the core of the application, organized into several key folders:

- **components**: This folder holds reusable React components that can be used throughout the application. Each component should be self-contained and styled appropriately.

- **lib**: This directory is for utility functions and libraries that can be shared across different parts of the application. For example, you might find helper functions or custom hooks here.

- **pages**: This folder contains the different pages of the application, each represented as a React component. The structure allows for easy routing and organization of the app's views.

- **hooks**: This directory is dedicated to custom React hooks that encapsulate reusable logic. Hooks can help manage state, side effects, and other functionalities in a clean and reusable way.

- **styles**: This folder is where global styles and CSS files are stored. It typically includes Tailwind CSS configurations and any custom styles that apply to the entire application.

## Contribution Guidelines

We welcome contributions to this project! Please follow these guidelines when contributing:

1. **Branching**: Always create a new branch for your feature or bug fix. The branch name should be descriptive of the changes you are making.

2. **Pull Requests**: Submit your pull requests against the `dev` branch. This allows for easier integration and testing of new features before they are merged into the main branch. All PRs should be made to the `dev` branch

3. **Code Quality**: Ensure that your code adheres to the existing style and conventions used in the project. Run ESLint and fix any issues before submitting your pull request.

4. **Documentation**: If you add new features or make significant changes, please update the documentation accordingly.

5. **Testing**: If applicable, include tests for your changes to ensure that they work as expected and do not introduce new bugs.

## Application Overview

Before making any updates, installing new packages, or changing outputs, please review the following resources to understand the current state of the application:

- **Documentation**: Check the `README.md` file for an overview of the project, including its structure and contribution guidelines.
- **Codebase**: Familiarize yourself with the code in the `src` directory, especially the `components`, `lib`, `pages`, and `hooks` folders, to see how different parts of the application interact.
- **Version Control**: Review the commit history in the repository to understand recent changes and the rationale behind them.
- **Dependencies**: Look at the `package.json` file to see the current dependencies and their versions. This will help you avoid conflicts when adding new packages.
- **Testing**: If applicable, check for existing tests in the project to ensure that any changes you make do not break existing functionality.

By reviewing these resources, you can make informed decisions and contribute effectively to the project.