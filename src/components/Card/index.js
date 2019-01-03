import styled from 'styled-components'
import {IoIosCloseCircle} from 'react-icons/io'
import {isWebUri} from 'valid-url'
import MicrolinkCard from '@microlink/react'

const Container = styled.div`
  position: relative;
  &:hover {
    .delete-button {
      display: block;
    }
  }
`

const DeleteButton = styled.div`
  display: none;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 100000;
  cursor: pointer;
`

const LinkContainer = styled.div`
  padding: 10px;
  .microlink_card {
    border-radius: 3px;
  }
`

const NotesContainer = styled.div`
  padding: 0px 10px 12px 10px;
`

export default props => {
  const {url, removeCard, laneId, id, notes} = props
  return (
    <Container>
      <DeleteButton className="delete-button">
        <div onClick={() => removeCard(laneId, id)}>
          <IoIosCloseCircle size="22px" />
        </div>
      </DeleteButton>
      <div>
        <LinkContainer>
          {isWebUri(url) ? (
            <MicrolinkCard url={url} size="small" />
          ) : (
            <div children={url} />
          )}
        </LinkContainer>
      </div>
      <NotesContainer>
        <div children={notes} />
      </NotesContainer>
    </Container>
  )
}
