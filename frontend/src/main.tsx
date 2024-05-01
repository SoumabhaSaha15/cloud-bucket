import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider ,extendTheme,ColorModeScript} from '@chakra-ui/react'
// import {Link,BrowserRouter,RouterProvider} from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode >
    <ChakraProvider theme={extendTheme()}>
      <ColorModeScript initialColorMode={"light"}/>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
