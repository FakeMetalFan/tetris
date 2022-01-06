import {
  createGlobalStyle,
} from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #292524;
    color: #fff;
    font-family: Comic Sans MS, cursive, sans-serif;
  }

  a {
    color: inherit;
  }

  #root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;
