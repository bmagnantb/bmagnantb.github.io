import React from 'react'
import styled from 'styled-components'

import { Row, Column } from '../grid'
import { heading } from '../type'

const H1 = styled.h1`
  ${heading};
`

const Hero = () => (
  <div>
    <Row>
      <Column xs={10} push={1} lg={4} pushLg={2}>
        <H1>App</H1>
      </Column>
    </Row>
    <Row>
      <Column xs={10} push={1} lg={4} pushLg={2}>
        <p>Lorem ipsum...</p>
      </Column>
    </Row>
  </div>
)

export default Hero
