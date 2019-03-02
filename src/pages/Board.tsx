import React, {useState, useEffect, FormEvent} from 'react'
import {
  asPage,
  NewCard,
  Card,
  LaneHeader,
  AddCardButton,
  Header,
  NewLane,
} from '../components'
import {getCurrentUser} from '../utilities'
import Board from 'react-trello'
import {IBoard} from '../@types/storage'
import {getFile, putFile} from 'blockstack'
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
  const [lastSaved, setLastSaved] = useState<{
    title: string
    description: string
  }>({title: boardTitle, description: boardDescription})

  const saveBoard = () => {
    const newBoard = {
      ...state,
      title: boardTitle,
      description: boardDescription,
      edited: new Date(),
    }
    putFile(`${id}.json`, JSON.stringify(newBoard)).then(() => {
      setLastSaved({
        title: boardTitle,
        description: boardDescription,
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
          setBoardTitle(parsed.title || '')
          setBoardDescription(parsed.description || '')
          setState(parsed)
          setLastSaved({
            title: parsed.title || '',
            description: parsed.description || '',
          })
        } else {
          redirect('404')
        }
      })
    })()
  }, [])

  console.log(lastSaved, boardTitle, boardDescription)

  return (
    state && (
      <>
        <Header
          centerInitialValue={boardTitle}
          centerPlaceholder='board name'
          centerOnChange={setBoardTitle}
          rightText={
            !(
              lastSaved.title === boardTitle &&
              lastSaved.description === boardDescription
            )
              ? 'save changes'
              : ''
          }
          rightOnClick={saveBoard}
        />
        <DescriptionField
          placeholder='description'
          onChange={({
            currentTarget: {value},
          }: FormEvent<HTMLTextAreaElement>) => setBoardDescription(value)}
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
