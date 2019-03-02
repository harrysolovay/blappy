import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import DeleteButton from './DeleteButton'

// make props optional because the react-trello API accepts the
// template as already-instantiated, then clones it and passes
// the props... it's kind of annoying... but building software
// is messy... and that's the way the cookie crumbles

interface Props {
  key?: string
  url?: string
  removeCard?: (laneId: number, id: number) => void
  laneId?: number
  id?: number
}

const OverflowVisibilityStyle = createGlobalStyle`
  .react-trello-lane > div {
    overflow: visible !important;
  }
  .smooth-dnd-draggable-wrapper {
    overflow: visible !important;

    > article > div:nth-child(2) {
      display: none;
    }
  }
`

const Container = styled.div`
  position: relative;
  overflow: visible;

  .delete-button {
    display: none;
  }

  &:hover {
    .delete-button {
      display: block;
    }
  }
`

const Link = styled.a`
  overflow-x: scroll;
  display: flex;
  flex: 1;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  text-decoration: none;

  > span {
    padding-bottom: 1px;
    padding-left: 10px;
  }

  > img {
    margin-left: 5px;
  }
`

export default ({key, id, laneId, removeCard, url}: Props) => {
  const deleteCard = () => removeCard && laneId && id && removeCard(laneId, id)

  return (
    <>
      <OverflowVisibilityStyle />
      <Container>
        <DeleteButton onClick={deleteCard} top={'4px'} right={'-4px'} />
        <Link {...{key}} href={url} target='_blank' rel='noopener noreferrer'>
          {url && (
            <img
              src={`http://www.google.com/s2/favicons?domain=${encodeURI(url)}`}
            />
          )}
          <span children={url} />
        </Link>
      </Container>
    </>
  )
}
