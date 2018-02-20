import { createElement } from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

render(
  createElement(App),
  document.getElementById('root')
);

registerServiceWorker();
