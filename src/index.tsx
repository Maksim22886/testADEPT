import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './style/_mixins.scss';
import './style/colors.scss';
import './style/fonts.scss';
import './style/reset.scss';
import './style/root.scss';
import './style/typeography.scss';

import App from './app/components/app/App';
import { Provider } from 'react-redux';
import store from './app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
