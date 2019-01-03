import styled, {keyframes} from 'styled-components'
import {TiSpiral} from 'react-icons/ti'

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .spinner {
    animation: ${spinAnimation} infinite 3s linear;
  }
`

export default () => (
  <Container>
    <div className="spinner">
      <TiSpiral size={30} />
    </div>
    <div>Loading</div>
  </Container>
)
