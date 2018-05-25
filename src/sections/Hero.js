import React from 'react'

import { Row, Column } from '../grid'
import { Text } from '../typography'

const Hero = () => (
  <div>
    <Row>
      <Column xs={10} push={1} lg={4} pushLg={2}>
        <Text Element={'h1'}>App lorem ipsum</Text>
      </Column>
    </Row>
    <Row>
      <Column xs={10} push={1} lg={4} pushLg={2}>
        <Text>Lorem ipsum...</Text>
      </Column>
    </Row>
  </div>
)

export default Hero
