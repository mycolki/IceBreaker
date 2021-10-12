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

  * {
    box-sizing: border-box;
  }

  html,
  body {
    overflow: hidden;
    font-family: 'Rammetto One', 'Do Hyeon';

    input {
      border: none;
      outline: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    button {
      border: none;
    }

    li {
      list-style: none;
    }
  }
`;

export default GlobalStyle;
