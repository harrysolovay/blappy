import Board from 'react-trello'
import {NewLane, LaneHeader, NewCard, Card, Button, Loading} from '~/components'
import {useState, useEffect} from 'react'
import {getFile, putFile} from 'blockstack'
import styled from 'styled-components'
import {IoIosCloseCircle} from 'react-icons/io'
import {Redirect} from 'react-router-dom'

const ActionBar = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  padding: 12px 14px 10px 14px;

  .title {
    font-size: 20px;
  }
`

const Inner = styled.div`
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

export default props => {
  const [state, setState] = useState({})
  const [exists, setExists] = useState(true)
  const [deleted, setDeleted] = useState(false)
  const boardId = props.match.params.id

  useEffect(() => {
    getFile(`${boardId}.json`).then(file => {
      if (file) {
        setState(JSON.parse(file))
      } else {
        setExists(false)
      }
    })
    return () => {
      setState({})
    }
  }, [])

  return !exists ? (
    <Redirect to="/404" />
  ) : deleted ? (
    <Redirect to="/" />
  ) : state.lanes ? (
    <>
      <Board
        draggable
        editable
        canAddLanes
        data={state}
        onDataChange={data => {
          const newState = {
            ...state,
            ...data,
          }
          setState(newState)
          putFile(`${boardId}.json`, JSON.stringify(newState))
        }}
        customCardLayout
        newLaneTemplate={<NewLane />}
        newCardTemplate={<NewCard />}
        customLaneHeader={<LaneHeader />}
        addCardLink={<Button children="add card" />}
      >
        <Card />
      </Board>
      <ActionBar>
        <Inner>
          <div className="title">{state.title}</div>
          <div className="description">{state.description}</div>
          <DeleteButton className="delete-button">
            <div
              onClick={() => {
                getFile('BLAPPY_BOARDS.json').then(data => {
                  const filtered = JSON.parse(data).filter(
                    b => b.id !== boardId,
                  )
                  putFile('BLAPPY_BOARDS.json', JSON.stringify(filtered)).then(
                    () => {
                      setDeleted(true)
                    },
                  )
                })
              }}
            >
              <IoIosCloseCircle size="22px" />
            </div>
          </DeleteButton>
        </Inner>
      </ActionBar>
    </>
  ) : (
    <Loading />
  )
}
