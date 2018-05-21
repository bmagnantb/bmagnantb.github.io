import React from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'

import { Row, Column } from './grid'
import { heading } from './type'

const H1 = styled.h1`
  ${heading};
  font-size:
`

const App = () => (
  <div>
    <Row>
      <Column push={2} size={8}>
        <H1>App</H1>
      </Column>
    </Row>
    <Row>
      <Column push={2} size={8}>
        <p>Lorem ipsum...</p>
      </Column>
    </Row>
  </div>
)

export default hot(module)(App)
