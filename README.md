# Practice Project
- This was created through learning and practice via a Udemy.com course by Stephen Grider
- https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/

# Setup and Startup Scripts
Must have lerna installed globally.

Navigate to `notebook/packages/local-client` and either `npm install` or `yarn install` to install dependencies.
Navigate back to `packages` directory and run `lerna bootstrap` to link all project directories.

Once again in `notebook/packages`, run `npm run start` or `yarn start` to start all packages simultaneously. 
This will startup a page on `localhost:3000`.

Similarly, you can navigate to `packages/cli/dist` and run `node index.js serve` to startup the cli.
This will open another localhost browser page with some minimal data persistence of code and text cells.

# Features
There are two buttons that allow you to add either a code cell or a text cell.

Text cells are simple text based widgets where you can type, style, and instantly view whatever text you have entered.

Code cells are widgets that behave similarly to something like code sandbox. You can enter valid javascript or jsx, and execute it with the show() keyword.

For example:
`const test = 'Hello, this is a test.'`

`show(test)`

You will then see the result of this executed code in the preview window to the right of the editor.

Each code cell also has function buttons to control their positioning, as well as allowing for deletion.
