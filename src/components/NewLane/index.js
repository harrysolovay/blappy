import styled from 'styled-components'
import {Component} from 'react'
import {Button, Input} from '~/components'

const Container = styled.div`
  display: block;
  background-color: #e3e3e3;
  padding: 5px;
  margin: 5px;
  border-radius: 4px;
  width: 270px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: #fff;
  border-radius: 3px;
`

const TextFieldContainer = styled.div`
  padding: 0px 0px 5px 0px;
`

export default class extends Component {
  updateField = (field, value) => {
    this.setState({[field]: value})
  }

  handleAdd = () => {
    this.props.onAdd(this.state)
  }

  render() {
    const {onCancel} = this.props
    return (
      <Container>
        <TextFieldContainer>
          <Input
            type="text"
            placeholder="title"
            onChange={({target: {value}}) => this.updateField('title', value)}
            autoFocus
          />
        </TextFieldContainer>
        <ButtonGroup>
          <Button onClick={this.handleAdd}>Add</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ButtonGroup>
      </Container>
    )
  }
}
