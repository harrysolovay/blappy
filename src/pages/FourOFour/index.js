import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > * {
    color: #fff;
  }
  div {
    font-size: 60px;
    margin-bottom: 30px;
  }
  a {
    margin-top: 10px;
  }
`

export default () => (
  <Container>
    <div>404</div>
    <span>Sorry, but this page doesn't seem to exist</span>
    <Link to="/">click here to go home</Link>
  </Container>
)
