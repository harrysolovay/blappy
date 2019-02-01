import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  display: block;
  appearance: none;
  border-radius: 2px;
  background-color: #fff;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 10px 0px;
  color: #2b6caf;

  &:hover {
    background-color: #f0f0f0;
  }
`

export default ({onClick}: {onClick?: () => void}) => (
  <Button children='add' {...{onClick}} />
)
