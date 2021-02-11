import { createGlobalStyle } from 'styled-components'
import theme from './theme'

const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    body {
      margin: 0;
      font-family: 'Source Serif Pro', serif;
      font-size: 18px;
      overflow-x: none;
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

    html {background-color: #F0F0EC}
  `

export default GlobalStyles
