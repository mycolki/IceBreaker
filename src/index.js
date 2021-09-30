import React from 'react';
import ReactDOM from 'react-dom';

import { createGlobalStyle } from 'styled-components';
import GlobalStyle from './styles/globalStyle';

import App from './components/App';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
