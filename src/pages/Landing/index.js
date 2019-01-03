import {redirectToSignIn} from 'blockstack'
import styled from 'styled-components'
import {withAuth} from '~/utilities'
import {useEffect, useState} from 'react'
import {Loading} from '~/components'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const Welcome = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 30px;
    font-weight: 500;
  }

  h3 {
    margin-top: 0px;
    font-size: 18px;
  }

  > div {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 3px;
    padding: 9px 13px;
    cursor: pointer;
    &:hover {
      opacity: 0.875;
    }
  }
`

const SourceLink = styled.div`
  width: 100%;
  padding: 10px;
  padding-top: 0px;
  > a {
    display: block;
    width: 100%;
    padding: 10px 10px 11px 10px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 3px;
    &:hover {
      opacity: 0.875;
    }
  }
`

const logIn = () => {
  const origin = window.location.origin
  redirectToSignIn(origin, `${origin}/manifest.json`, [
    'store_write',
    'publish_data',
  ])
}

export default props => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    withAuth(user => {
      if (user) {
        window.location.href = `${window.location.origin}/boards`
      } else {
        setLoading(false)
      }
    })
  }, [])
  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Welcome>
        <h1>Blappy Dapp</h1>
        <h3>A Blockstack Link-saving Dapp</h3>
        <div onClick={logIn}>log in with Blockstack</div>
      </Welcome>
      <SourceLink>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/harrysolovay"
          children={`check out this dapp's source code`}
        />
      </SourceLink>
    </Container>
  )
}
