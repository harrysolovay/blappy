import styled from 'styled-components'
import {Component} from 'react'
import {Button, Input, Textarea} from '~/components'

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`

const TextFieldContainer = styled.div`
  padding: 5px 5px 0px 5px;
`

export default class extends Component {
  updateField = (field, value) => {
    console.log(field, value)
    this.setState({[field]: value})
  }

  handleAdd = () => {
    this.props.onAdd(this.state)
  }

  render() {
    const {onCancel} = this.props
    return (
      <div style={{background: '#fff'}}>
        <TextFieldContainer>
          <div>
            <Input
              placeholder="url"
              onChange={({target: {value}}) => this.updateField('url', value)}
              autoFocus
            />
          </div>
          <div>
            <Textarea
              placeholder="notes"
              onChange={({target: {value}}) => this.updateField('notes', value)}
            />
          </div>
        </TextFieldContainer>
        <ButtonGroup>
          <Button onClick={this.handleAdd}>Add</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ButtonGroup>
      </div>
    )
  }
}
