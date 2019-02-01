import React, {useState, MouseEvent, FormEvent} from 'react'
import styled from 'styled-components'
import {signUserOut} from 'blockstack'

interface Props {
  centerInitialValue: string
  centerPlaceholder: string
  centerOnChange: (newValue: string) => void
  rightText: any
  rightOnClick: (e: MouseEvent<HTMLElement>) => void
}

const Button = styled.button`
  border: none;
  appearance: none;
  padding: 0px 20px;
  cursor: pointer;
`

const TitleField = styled.input`
  border: none;
  appearance: none;
  text-align: center;
  display: flex;
  flex: 1;
`

const Header = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  width: 100%;
  height: 59px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  z-index: 10;
  background-color: #fff;
`

export default ({
  centerInitialValue,
  centerPlaceholder: placeholder,
  centerOnChange,
  rightText,
  rightOnClick,
}: Props) => {
  const [value, setValue] = useState<string>(centerInitialValue)
  const updateValue = (e: FormEvent<HTMLInputElement>) => {
    const {value: newValue} = e.currentTarget
    setValue(newValue)
    centerOnChange(newValue)
  }

  return (
    <Header>
      <Button children='log out' onClick={() => signUserOut('/')} />
      <TitleField onChange={updateValue} {...{value, placeholder}} />
      <Button onClick={rightOnClick} children={rightText} />
    </Header>
  )
}
