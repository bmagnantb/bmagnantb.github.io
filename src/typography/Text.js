import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'
import { transparentize } from 'polished'

const transparentWhite = transparentize(0.7, '#fff')
const offset = 0.125 // rem

const Text = ({ Element = 'p', children }) => {
  const HeadingComponent = styled[Element]`
    font-family: 'Yeseva One', serif;
  `

  const TextContainer = styled.span`
    display: inline-block;
    position: relative;
    width: auto;
    z-index: 1;
  `

  const Shadow = styled.span`
    background-color: ${transparentWhite};
    border-radius: 100%;
    display: block;
    filter: blur(1rem);
    height: calc(100% + ${offset}rem);
    left: -${offset}rem;
    position: absolute;
    top: -${offset / 2}rem;
    width: calc(100% + ${offset * 2}rem);
    z-index: -1;
  `

  return <HeadingComponent><TextContainer>{children}<Shadow /></TextContainer></HeadingComponent>
}

Text.propTypes = {
  children: string.isRequired,
  Element: string
}

export default Text
