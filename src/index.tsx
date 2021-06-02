import 'index.scss';

import App from 'App';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import setupIcons from 'setup-icons';

setupIcons();

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
