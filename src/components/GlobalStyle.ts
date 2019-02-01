import {createGlobalStyle} from 'styled-components'
import normalize from 'styled-normalize'

export default createGlobalStyle`
  ${normalize};

  body {
    background-color: #4379b5;
  }

  * {
    box-sizing: border-box;
    backface-visibility: none;
    appearance: none;
    text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;

    &:not(i) {
      font-family: 'Helvetica Neue', sans-serif;
      font-weight: 200;
      font-size : 16px;
      line-height : 24px;
      color: #333333;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    &:focus {
      outline : 0;
    }

    &::webkit-scrollbar {
      display : none;
    }
  }
`
