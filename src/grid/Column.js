import styled from 'styled-components'
import { number } from 'prop-types'
import breakpoint from 'styled-components-breakpoint'

const columnSize = num => num ? `${num / 12 * 100}%` : 0

const Column = styled.div`
    display: inline-block;
    margin-left: ${({ push }) => columnSize(push)};
    padding-left: .5rem;
    padding-right: .5rem;
    width: ${({ xs }) => columnSize(xs)};

    ${breakpoint('sm')`
      ${({ pushSm }) => pushSm ? `margin-left: ${columnSize(pushSm)};` : ''}
      ${({ sm }) => sm ? `width: ${columnSize(sm)};` : ''}
    `}

    ${breakpoint('md')`
      ${({ pushMd }) => pushMd ? `margin-left: ${columnSize(pushMd)};` : ''}
      ${({ md }) => md ? `width: ${columnSize(md)};` : ''}
    `}

    ${breakpoint('lg')`
      ${({ pushLg }) => pushLg ? `margin-left: ${columnSize(pushLg)};` : ''}
      ${({ lg }) => lg ? `width: ${columnSize(lg)};` : ''}
    `}

    ${breakpoint('xl')`
      ${({ pushXl }) => pushXl ? `margin-left: ${columnSize(pushXl)};` : ''}
      ${({ xl }) => xl ? `width: ${columnSize(xl)};` : ''}
    `}
`
Column.propTypes = {
  xs: number.isRequired,
  push: number,
  sm: number,
  pushSm: number,
  md: number,
  pushMd: number,
  lg: number,
  pushLg: number,
  xl: number,
  pushXl: number
}

export default Column
