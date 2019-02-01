import React, {useState} from 'react'
import styled from 'styled-components'
import DeleteButton from './DeleteButton'

interface Props {
  id: string
  title?: string
  removeLane: (id: string) => void
}

const Container = styled.div`
  position: relative;
  overflow: visible;
  cursor: pointer;

  .delete-button {
    display: none;
  }

  &:hover {
    .delete-button {
      display: block;
    }
  }
`

const Heading = styled.div`
  padding-top: 1px;
  padding-left: 1px;
  margin: 0px;
  font-size: 18px;
`

const HR = styled.hr`
  border: none;
  height: 1px;
  background-color: #bbb;
`

export default ({title, removeLane, id}: Props) => {
  return (
    <Container>
      <DeleteButton onClick={() => removeLane(id)} top='1px' />
      <Heading children={title} />
      <HR />
    </Container>
  )
}
