import React from 'react'
import { hot } from 'react-hot-loader'

import { Row, Column } from './grid'

const App = () => (
  <div>
    <Row>
      <Column push={3} size={6}>
        <h1>App</h1>
      </Column>
    </Row>
  </div>
)

export default hot(module)(App)
