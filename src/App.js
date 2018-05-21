import React from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'

import { Hero } from './sections'

const App = () => (
  <div>
    <Hero />
  </div>
)

export default hot(module)(App)
