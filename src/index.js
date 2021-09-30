import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider, createGlobalStyle } from 'styled-components';
import GlobalStyle from './styles/globalStyle';
import theme from './styles/theme';

import App from './components/App';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById('root'),
);
