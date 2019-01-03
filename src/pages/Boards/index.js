import {useState, useEffect} from 'react'
import styled from 'styled-components'
import Masonry from 'react-masonry-component'
// import data from '~/boards-data'
import {Link} from 'react-router-dom'
import {generate as createId} from 'shortid'
import {getFile, putFile, signUserOut} from 'blockstack'
import {Input, Textarea, Button} from '~/components'

const Nav = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  background-color: #ccc;
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  z-index: 10000;
`

const NewBoardButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 16px 1px 16px;
  border-left: 1px solid #e9e9e9;
  background-color: #fff;
  cursor: pointer;
`

const Search = styled.input`
  display: flex;
  flex: 1;
  border: none;
  padding: 15px 17px 16px 17px;
`

const Container = styled.div`
  margin: 60px auto 0px auto;
  max-width: 1000px;
  padding-bottom: 60px;

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
    border-bottom: 1px solid #ccc;
    border-radius: 3px;
    padding: 12px 14px 10px 14px;
    background-color: #e3e3e3;
    cursor: pointer;
    > * {
      text-decoration: none;
    }
    &.added:hover {
      opacity: 0.875;
    }

    .heading {
      font-size: 18px;
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 3px;
`

const NoBoards = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: calc(100vh - 59px);
  align-items: center;
  justify-content: center;
  text-align: center;
`

const LogOut = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgb(255, 230, 230);
  padding: 15px;
  text-align: center;
  cursor: pointer;
`

export default props => {
  const [boards, setBoards] = useState([])
  const [searchText, setSearchText] = useState('')
  const [addingNewBoard, setAddingNewBoard] = useState(false)
  const [newBoardTitle, setNewBoardTitle] = useState('')
  const [newBoardDescription, setNewBoardDescription] = useState('')

  useEffect(() => {
    getFile('BLAPPY_BOARDS.json').then(data => {
      setBoards(JSON.parse(data))
    })
  }, [])

  return (
    <>
      <Container>
        <Nav>
          <Search
            placeholder="search"
            onChange={({target: {value}}) => setSearchText(value)}
          />
          <NewBoardButton onClick={() => setAddingNewBoard(true)}>
            new board
          </NewBoardButton>
        </Nav>
        <div className="masonry">
          <Masonry>
            {addingNewBoard && (
              <div className="masonry-card new">
                <Input
                  autoFocus
                  placeholder="New Board Title"
                  onChange={({target: {value}}) => setNewBoardTitle(value)}
                />
                <Textarea
                  placeholder="Description"
                  onChange={({target: {value}}) =>
                    setNewBoardDescription(value)
                  }
                />
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      setNewBoardTitle('')
                      setNewBoardDescription('')
                      setAddingNewBoard(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      const newId = createId()
                      const newBoard = {
                        id: newId,
                        title: newBoardTitle,
                        description: newBoardDescription,
                      }
                      const newBoards = [...boards, newBoard]

                      Promise.all([
                        putFile(
                          'BLAPPY_BOARDS.json',
                          JSON.stringify(newBoards),
                        ),
                        putFile(
                          `${newId}.json`,
                          JSON.stringify({
                            ...newBoard,
                            lanes: [],
                          }),
                        ),
                      ]).then(() => {
                        setBoards(newBoards)

                        // defaults
                        setNewBoardTitle('')
                        setNewBoardDescription('')
                        setAddingNewBoard(false)
                        // put file for the board
                        window.location.href = `${
                          window.location.origin
                        }/board/${newId}`
                      })
                    }}
                  >
                    Add
                  </Button>
                </ButtonGroup>
              </div>
            )}
            {boards.map(
              board =>
                board.title.match(new RegExp(`${searchText}`, 'i')) && (
                  <div key={board.id} className="masonry-card added">
                    <Link to={`/board/${board.id}`}>
                      <div className="heading">{board.title}</div>
                      <div className="body">{board.description}</div>
                    </Link>
                  </div>
                ),
            )}
            {boards.length === 0 && !addingNewBoard && (
              <NoBoards>no boards to show</NoBoards>
            )}
          </Masonry>
        </div>
      </Container>
      <LogOut onClick={() => signUserOut(window.location.origin)}>
        Log Out
      </LogOut>
    </>
  )
}
