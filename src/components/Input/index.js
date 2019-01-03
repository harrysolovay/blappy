import styled from 'styled-components'

const shared = `
  display: flex;
  flex: 1;
  width: 100%;
  background-color: #fff;
  padding: 8px 16px 9px 16px;
  font-size: 15px;
  border-radius: 4px;
  opacity: 0.75;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  box-shadow: none;
  border: 1px solid #e1e8ed;
  &:focus {
    outline: none;
    border: 1px solid #81d8f7;
  }
  &:hover {
    opacity: 1;
  }
`

export const Input = styled.input`
  ${shared}
`

export const Textarea = styled.textarea`
  margin-top: 5px;
  ${shared}
`
