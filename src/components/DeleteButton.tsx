import React, {MouseEvent} from 'react'
import styled from 'styled-components'
import {IoIosCloseCircle} from 'react-icons/io'

interface Props {
  onClick: (e: MouseEvent<HTMLElement>) => void
  top?: string
  right?: string
}

const StyledDeleteButton = styled.button<{top?: string; right?: string}>`
  position: absolute;
  z-index: 10000;
  top: ${props => (props.top ? props.top : '-7px')};
  right: ${props => (props.right ? props.right : '-12px')};
  border: none;
  appearance: none;
  border-radius: 2px;
  background-color: transparent;
  cursor: pointer;
`

export default ({onClick, top, right}: Props) => (
  <StyledDeleteButton
    {...{onClick}}
    className='delete-button'
    {...{top, right}}
  >
    <IoIosCloseCircle size={20} />
  </StyledDeleteButton>
)
