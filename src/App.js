import React from 'react'
import { hot } from 'react-hot-loader'
import { ThemeProvider } from 'styled-components'
import Gradient from 'react-dynamic-gradient/src/lib'

import theme from './theme'
import { Hero } from './sections'

const backgroundColors = [
  { hex: '#54A38D', opacity: 0.45, weight: 3 },

  { hex: '#4EDAE7', opacity: 0.5, weight: 3 },

  { hex: '#D24982', opacity: 0.5, weight: 3 },

  { hex: '#FFFF29', opacity: 0.5, weight: 1 }
]

const App = () => (
  <ThemeProvider theme={theme}>
    <div>
      <div id='content'>
        <Hero />
      </div>
      <Gradient colors={backgroundColors} />
    </div>
  </ThemeProvider>
)

export default hot(module)(App)
