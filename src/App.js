import React from 'react'
import { hot } from 'react-hot-loader'
import { ThemeProvider } from 'styled-components'

import theme from './theme'
import { Hero } from './sections'

const App = () => (
  <ThemeProvider theme={theme}>
    <div>
      <Hero />
    </div>
  </ThemeProvider>
)

export default hot(module)(App)
