import ReactDOM from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import CodeCell from './components/code-cell';
// import TextEditor from './components/text-editor';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/cell-list/cell-list';

// reminder to install packages with npm install {packageName} --legacy-peer-deps to avoid errors
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
