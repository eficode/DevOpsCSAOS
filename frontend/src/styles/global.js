import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    body {
      font-family: 'Source Serif Pro', serif;
      font-size: 18px;
      overflow-x: none;
      display: flex;
      justify-content: center;
    }


    @media (min-width: 480px) {
      html {
        font-size: 112.5%; 
      }
    }

    @media (min-width: 600px) {
      html {
        font-size: 125%; 
      }
    } 

    html {
      background-color: white;
    }
  `

export default GlobalStyles
