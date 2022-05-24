import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import COLOR from 'constant/color';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input,button {
    background-color: transparent;
    border: none;
    outline: none;
  }
  ol,ul,li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  button {
    cursor: pointer;
  }
  body {
    background-color: #fff;
    font-family: 'Pr-Regular';
    font-size: 0.9rem;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .ui.secondary.menu .active.item {
    font-family: 'Pr-Regular';
    background: none;
    color: ${COLOR.PRIMARY};
  }

  .ui.pagination.menu .item {
    min-width: 0;
  }

  .loading > .column > div > div > *  {
  background-color: #d8dde1!important;
  color: transparent!important;
  border: transparent!important;
  border-radius: 0!important;
  }
  .loading > .column > div > div > div > *  {
  background-color: #d8dde1!important;
  color: transparent!important;
  border: transparent!important;
  border-radius: 0!important;
  }
  .loading > .column > div > div > img {
    content: url("/images/transparent.png");
    background-color: #d8dde1!important;
    border-radius: 0!important;
  }
    
`;

export default GlobalStyles;
