# 0x01 React State Into

## Getting Started

- Run `npm install` to install dependencies
- Run `npm run dev` to start the dev server
- Open `http://localhost:3000` in a browser

### Dev Container

There is a dev container preconfigured with Node 21 on alpine linux. If you would like to use the dev container:

- Install the [Dev Containers Plugin](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code
- Open the command pallet (Cntrl / Command + Shift + P) in VS Code
- Select "Dev Container: Reopen in Container"

For more information on using dev containers see this [tutorial](https://atlas-jswank.github.io/blog/dev-containers/) or the [official documentation](https://containers.dev/)

### Important Files/Folders

- `src`: All javascript/jsx code goes in this directory
- `src/assets`: Any static assets such as images that are loaded through the javascript files goes here.
- `index.html`: This is the html file that appears when the dev server starts up.

### Important Commands

- `npm run dev`: Starts dev server with Hot Module Reloading on port 3000. Anytime a file changes, the changes will automatocally be reflected in the browser
- `npm run lint`: Run the lint checker with eslint to check for known linting issues
- `npm run format`: Run prettier to automatically reformat files

## Project:

### Resources:

- [State: a components memory](https://react.dev/learn/state-a-components-memory)
- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)

### Learning Objectives:

- React Hooks
- useState
- useEffect
- Context Providers

### Tasks

#### Fetch Data with API

- Load data using fetch to call `http://localhost:3000/api/courses.json`
- Utilize the `useEffect` hook
- Render a row in the table for each object returned

#### Filtering

- Typing in the search input field should filter the table rows to only shows rows that contain the text in the search field.
- The filtering should be case insensitive.

#### Sorting

- Click the column heading should sort the rows by that columnin ascending order.
- Click the same column a second time should change the ordering to descencing order.

#### Pagination

- Limit the data show in the table to 10 rows at a time
- Clickng the Next button should change the table to show the next 10 results.
- Clicking the Previous button should change the abled to show the previous 10 results.
- Disable the next button if on the first page of results.
- Disable the previous button if on the last page of results.
- You will need to utilize the state hook to keep track of which page you are on.

#### Enroll in Course

- Create a context provider in the App component that tracks enrolled courses.
- When a user clicks the enroll button, that course should be added to the enrolled courses in the context.
- Enrolled courses shouls show in the class schedule table

#### Drop Course

- When a user clicks the drop button, that course should be removed from the enrolled courses in the context.
- The course should no longer appear in the call schedule table

#### Course Count

- The course count in the header should reflect the correct number of courses in the class schedule table.
