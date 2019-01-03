import styled from 'styled-components'
import {IoIosCloseCircle} from 'react-icons/io'

const Container = styled.div`
  position: relative;
  cursor: pointer;
  &:hover {
    .delete-button {
      display: block;
    }
  }
`

const DeleteButton = styled.div`
  display: none;
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 100000;
`

const H6 = styled.h6`
  padding: 10px 0px 4px 0px;
  margin: 0px;
  font-size: 18px;
`

const Hr = styled.hr`
  margin: 0px;
  padding: 0px;
  border-width: 0px;
  height: 1px;
  background-color: #bbb;
`

export default ({title}) => (
  <Container>
    <DeleteButton className="delete-button">
      <IoIosCloseCircle size="22px" />
    </DeleteButton>
    <H6 children={title} />
    <Hr />
  </Container>
)
