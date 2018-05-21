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

export default Hero
