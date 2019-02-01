import React, {useState, FormEvent} from 'react'
import styled from 'styled-components'

// make props optional because the react-trello API accepts the
// template as already-instantiated, then clones it and passes
// the props... it's kind of annoying... but building software
// is messy... and that's the way the cookie crumbles

interface Props {
  onCancel?: () => void
  onAdd?: (value: {url: string}) => void
}

const Container = styled.div`
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
  const [url, setUrl] = useState<string>('')

  const updateUrl = (e: FormEvent<HTMLInputElement>) => {
    const {value} = e.currentTarget
    setUrl(value)
  }

  const addUrl = () => props.onAdd && props.onAdd({url})
  const onCancel = () => props.onCancel && props.onCancel()

  return (
    <Container>
      <input placeholder='url' onChange={updateUrl} autoFocus />
      <div>
        <button onClick={addUrl} children='add' style={{color: '#2b6caf'}} />
        <button
          onClick={onCancel}
          children='cancel'
          style={{color: '#d95040'}}
        />
      </div>
    </Container>
  )
}
