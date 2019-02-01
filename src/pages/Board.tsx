import React, {useState, useEffect, FormEvent} from 'react'
import {
  asPage,
  NewCard,
  Card,
  LaneHeader,
  AddCardButton,
  Header,
  DeleteButton,
  NewLane,
} from '../components'
import {getCurrentUser} from '../utilities'
import Board from 'react-trello'
import {IBoard, ILane} from '../@types/storage'
import {getFile, putFile, deleteFile} from 'blockstack'
import {generate as createId} from 'shortid'
import styled from 'styled-components'

const DescriptionField = styled.textarea`
  appearance: none;
  border: none;
  border-top: 1px solid #ccc;
  background-color: rgba(255, 255, 255, 0.925);
  height: 60px;
  width: 100%;
  padding: 10px;
  resize: none;
  position: fixed;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 1000;
`

export default asPage(({match: {params: {id}}, redirect}) => {
  const [state, setState] = useState(null as IBoard | null)
  const [boardTitle, setBoardTitle] = useState<string>('')
  const [boardDescription, setBoardDescription] = useState<string>('')
  let pending = new Date().getTime()

  const saveBoardTitle = (value: string) => {
    console.log('triggered')

    setBoardTitle(value)
    const newBoard = {...state, title: value, edited: new Date()}

    const currentTime = new Date().getTime()
    pending = currentTime

    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (currentTime === pending) {
          putFile(`${id}.json`, JSON.stringify(newBoard))
            .then(resolve)
            .catch(reject)
        }
      }, 1000)
    }).then(() =>
      getFile(`${id}.json`).then(data => console.log(JSON.parse(data))),
    )
  }

  const saveBoardDescription = (value: string) => {
    setBoardDescription(value)
    const newBoard = {...state, description: value, edited: new Date()}

    const currentTime = new Date().getTime()
    pending = currentTime

    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (currentTime === pending) {
          putFile(`${id}.json`, JSON.stringify(newBoard))
            .then(resolve)
            .catch(reject)
        }
      }, 1000)
    }).then(() =>
      getFile(`${id}.json`).then(data => console.log(JSON.parse(data))),
    )
  }

  const deleteBoard = () => {
    getFile('BLAPPY_BOARDS.json').then(data => {
      const filtered = JSON.parse(data).filter((b: IBoard) => b.id !== id)
      putFile('BLAPPY_BOARDS.json', JSON.stringify(filtered)).then(() => {
        const {origin} = window.location
        window.location.href = origin
      })
    })
  }

  useEffect(() => {
    ;(async () => {
      const user = await getCurrentUser()
      !user && redirect('/')

      getFile(`${id}.json`).then(data => {
        if (data) {
          const parsed = JSON.parse(data)
          console.log(parsed)
          setBoardTitle(parsed.title)
          setBoardDescription(parsed.description)
          setState(parsed)
        } else {
          redirect('404')
        }
      })
    })()
  }, [])

  return (
    state && (
      <>
        <Header
          centerInitialValue={boardTitle}
          centerPlaceholder='board name'
          centerOnChange={saveBoardTitle}
          rightText={
            <DeleteButton onClick={deleteBoard} top={'19px'} right={'11px'} />
          }
          rightOnClick={() => {}}
        />
        <DescriptionField
          placeholder='description'
          onChange={({
            currentTarget: {value},
          }: FormEvent<HTMLTextAreaElement>) => saveBoardDescription(value)}
          value={boardDescription}
        />
        <Board
          draggable={true}
          editable={true}
          canAddLanes={true}
          customCardLayout={true}
          newCardTemplate={<NewCard />}
          newLaneTemplate={<NewLane />}
          customLaneHeader={
            <LaneHeader
              id='will-be-overriden'
              removeLane={(id: string) => {
                if (state && state.lanes) {
                  const newLanes = state.lanes.filter(lane => lane.id !== id)
                  const newState = {...state, lanes: newLanes}
                  setState(newState)
                }
              }}
            />
          }
          addCardLink={<AddCardButton />}
          data={state}
          style={{backgroundColor: 'transparent', marginBottom: '60px'}}
          onDataChange={(newState: IBoard) => {
            putFile(
              `${id}.json`,
              JSON.stringify({
                ...newState,
                edited: new Date(),
                title: boardTitle,
              }),
            ).then(() => {
              setState(newState)
            })
          }}
        >
          <Card />
        </Board>
      </>
    )
  )
})
