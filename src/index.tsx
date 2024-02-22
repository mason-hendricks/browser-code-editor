import ReactDOM from 'react-dom';
import CodeCell from './components/code-cell';

// reminder to install packages with npm install {packageName} --legacy-peer-deps to avoid errors
const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
