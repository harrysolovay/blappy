import React, {useState, FormEvent} from 'react'
import styled from 'styled-components'

// make props optional because the react-trello API accepts the
// template as already-instantiated, then clones it and passes
// the props... it's kind of annoying... but building software
// is messy... and that's the way the cookie crumbles

interface Props {
  onCancel?: () => void
  onAdd?: (value: {title: string}) => void
}

const Container = styled.div`
  background-color: #e9e9e9;
  border-radius: 3px;
  margin: 6px;
  padding: 10px;
  width: 270px;

  input {
    border: none;
    appearance: none;
    text-align: left;
    width: 100%;
    border-radius: 2px;
    padding: 10px;
    font-size: 18px;
  }

  > div {
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 2px;

    button {
      border: none;
      appearance: none;
      padding: 10px;
      cursor: pointer;
      border-radius: 2px;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
    }
  }
`

export default (props: Props) => {
  const [title, setTitle] = useState<string>('')

  const updateTitle = (e: FormEvent<HTMLInputElement>) => {
    const {value} = e.currentTarget
    setTitle(value)
  }

  const addLane = () => props.onAdd && props.onAdd({title})
  const onCancel = () => props.onCancel && props.onCancel()

  return (
    <Container>
      <input placeholder='Title' onChange={updateTitle} autoFocus />
      <div>
        <button onClick={addLane} children='add' style={{color: '#2b6caf'}} />
        <button
          onClick={onCancel}
          children='cancel'
          style={{color: '#d95040'}}
        />
      </div>
    </Container>
  )
}
