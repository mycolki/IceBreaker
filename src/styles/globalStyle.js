import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body {
    overflow: hidden;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #043F3F;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
