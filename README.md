# Practice Project
- This was created through learning and practice via a Udemy.com course by Stephen Grider
- https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/

# Setup and Startup Scripts
In a terminal, run `npx mh-react-notebook` which will reach out to my npm organization and download the necessary packages needed to run this app.

# Features
There are two buttons that allow you to add either a code cell or a text cell.

Text cells are simple text based widgets where you can type, style, and instantly view whatever text you have entered.

Code cells are widgets that behave similarly to something like code sandbox. You can enter valid javascript or jsx, and execute it with the show() keyword.

For example:
`const test = 'Hello, this is a test.'`

`show(test)`

OR:

`const App = () => {
  return <h1>Hello!</h1>
}
`

`show(<App />)`

You will then see the result of this executed code in the preview window to the right of the editor.

Each code cell also has function buttons to control their positioning, as well as allowing for deletion.
