import React, {useState, useEffect, FormEvent} from 'react'
import styled from 'styled-components'
import {asPage, Header, AddCardButton, DeleteButton} from '../components'
import {getCurrentUser} from '../utilities'
import {IBoards, IBoard} from '../@types/storage'
import {Link} from 'react-router-dom'
import Masonry from 'react-masonry-component'
import {generate as createId} from 'shortid'
import {getFile, putFile, signUserOut, deleteFile} from 'blockstack'

const Container = styled.div`
  margin: 0px auto;
  max-width: 1000px;

  .masonry {
    width: 100%;
    padding: 2.5%;
    @media screen and (min-width: 560px) {
      padding: 1.25%;
    }
  }

  .masonry-card {
    display: block;
    float: left;
    width: 95%;
    margin: 2.5%;
    border-bottom: 1px solid #ccc;
    border-radius: 3px;
    padding: 12px 14px 10px 14px;
    background-color: #fff;
    cursor: pointer;

    .delete-button {
      display: none;
    }

    &:hover {
      .delete-button {
        display: block;
      }
    }

    * {
      text-decoration: none;
    }

    .heading {
      font-size: 18px;
      width: 100%;
    }

    &.new {
      padding: 15px 14px 13px 14px;
    }

    @media screen and (min-width: 560px) and (max-width: 859px) {
      width: 47.5%;
      margin: 1.25%;
    }

    @media screen and (min-width: 860px) {
      width: 30.8333%;
      margin: 1.25%;
    }
  }
`

const Button = styled.button`
  border: none;
  appearance: none;
  padding: 0px 20px;
  cursor: pointer;
`

const shared = `
  border: none;
  appearance: none;
  text-align: left;
  width: 100%;
  border-radius: 2px;
`

const TitleField = styled.input`
  ${shared}
  padding: 10px;
  font-size: 18px;
`

const DescriptionField = styled.textarea`
  ${shared}
  padding: 0px 10px;
  resize: none;
`

const filter = (text: string, search: string) => {
  const regexStr = '(?=.*' + search.split(/\,|\s/).join(')(?=.*') + ')'
  const searchRegEx = new RegExp(regexStr, 'gi')
  return text.match(searchRegEx) !== null
}

export default asPage(({redirect}) => {
  const [boards, setBoards] = useState(null as IBoards | null)
  const [searchText, setSearchText] = useState<string>('')
  const [newBoardTitle, setNewBoardTitle] = useState<string>('')
  const [newBoardDescription, setNewBoardDescription] = useState<string>('')
  const [addingNewCard, setAddingNewCard] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const user = await getCurrentUser()
      !user && redirect('/')

      getFile('BLAPPY_BOARDS.json').then(data => {
        if (data) {
          setBoards(JSON.parse(data))
        } else {
          setBoards([])
        }
      })
    })()

    return () => setBoards(null)
  }, [])

  const resetAddNewBoardForm = () => {
    setNewBoardTitle('')
    setNewBoardDescription('')
  }

  const exp = new RegExp(`${searchText}`, 'i')

  return (
    boards && (
      <Container>
        <Header
          leftText='log out'
          leftOnClick={() => signUserOut('/')}
          centerInitialValue=''
          centerPlaceholder='search'
          centerOnChange={(value: string) => setSearchText(value)}
          rightText={addingNewCard ? 'cancel addition' : 'new board'}
          rightOnClick={() => {
            addingNewCard && resetAddNewBoardForm()
            setAddingNewCard(!addingNewCard)
          }}
        />
        <div className='masonry'>
          <Masonry>
            {addingNewCard && (
              <div className='masonry-card new'>
                <TitleField
                  autoFocus
                  placeholder='title'
                  value={newBoardTitle}
                  onChange={({
                    currentTarget: {value},
                  }: FormEvent<HTMLInputElement>) => setNewBoardTitle(value)}
                />
                <DescriptionField
                  placeholder='description'
                  value={newBoardDescription}
                  onChange={({
                    currentTarget: {value},
                  }: FormEvent<HTMLTextAreaElement>) =>
                    setNewBoardDescription(value)
                  }
                />
                <AddCardButton
                  onClick={() => {
                    // add board
                    const id = createId()
                    const newBoard = {
                      id,
                      title: newBoardTitle,
                      description: newBoardDescription,
                      edited: new Date(),
                    }
                    const newBoards = [newBoard, ...boards]

                    Promise.all([
                      putFile('BLAPPY_BOARDS.json', JSON.stringify(newBoards)),
                      putFile(
                        `${id}.json`,
                        JSON.stringify({
                          ...newBoard,
                          lanes: [],
                        }),
                      ),
                    ]).then(() => {
                      redirect(`board/${id}`)
                    })
                  }}
                />
              </div>
            )}
            {boards.map((board: IBoard, i: number) => {
              return (
                board &&
                ((board.title && board.title.match(exp)) ||
                  (board.description && board.description.match(exp))) && (
                  <div className='masonry-card' key={board.id}>
                    <DeleteButton
                      onClick={() => {
                        getFile('BLAPPY_BOARDS.json').then(data => {
                          const filtered = JSON.parse(data).filter(
                            (b: IBoard) => b.id !== board.id,
                          )
                          putFile(
                            'BLAPPY_BOARDS.json',
                            JSON.stringify(filtered),
                          ).then(() => {
                            setBoards(filtered)
                          })
                        })
                      }}
                    />
                    <Link to={`board/${board.id}`}>
                      <div className='heading' children={board.title} />
                      <div
                        className='description'
                        children={board.description}
                      />
                    </Link>
                  </div>
                )
              )
            })}
          </Masonry>
        </div>
      </Container>
    )
  )
})
