import styled from 'styled-components'
import { number } from 'prop-types'

const Column = styled.div`
    display: inline-block;
    margin-left: ${({ push }) => push ? `${(push / 12) * 100}%` : 0};
    padding-left: .5rem;
    padding-right: .5rem;
    width: ${({ size }) => `${(size / 12) * 100}%`};
`
Column.propTypes = {
  push: number,
  size: number.isRequired
}

export default Column
