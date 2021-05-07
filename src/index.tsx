import 'index.scss';

import App from 'App';
import React from 'react';
import { render } from 'react-dom';
import setupIcons from 'setup-icons';

setupIcons();

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
