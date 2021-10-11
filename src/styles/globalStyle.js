import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${reset}

  a:link {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  html,
  body {
    overflow: hidden;
    font-family: 'Rammetto One', 'Do Hyeon';

    input {
      border: none;
      outline: none;
    }

    button {
      border: none;
    }
  }
`;

export default GlobalStyle;
