import React, {useEffect} from 'react'
import {asPage} from '../components'
import {redirectToSignIn} from 'blockstack'
import {getCurrentUser} from '../utilities'
import styled, {keyframes} from 'styled-components'

const logIn = () => {
  const origin = window.location.origin
  redirectToSignIn(`${origin}/boards`, `${origin}/manifest.json`, [
    'store_write',
    'publish_data',
  ])
}

const gradientAnimation = keyframes`
  0% {
  background-position: 0% 50%
  }
50% {
background-position: 100% 50%
}
100% {
background-position: 0% 50%
}
`

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: ${gradientAnimation} 15s ease infinite;
  -moz-animation: ${gradientAnimation} 15s ease infinite;
  animation: ${gradientAnimation} 15s ease infinite;

  .title {
    font-size: 30px;
    font-weight: 500;
  }

  .subtitle {
    font-weight: 500;
    margin-top: 15px;
    font-size: 20px;
  }

  .action-group {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
  }

  button,
  a {
    display: block;
    appearance: none;
    border-radius: 3px;
    border: 1px solid #000;
    cursor: pointer;
    padding: 10px 0px;
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.5);
    margin: 5px;
    padding: 8px 10px;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`

export default asPage(({redirect}) => {
  useEffect(() => {
    ;(async () => {
      const user = await getCurrentUser()
      user && redirect('boards')
    })()
  }, [])

  return (
    <Container>
      <div className='title' children='BLAPPY' />
      <div
        className='subtitle'
        children={[
          `The Blockstack-based link`,
          <br />,
          `dapp that'll make you happy!`,
        ]}
      />
      <div className='action-group'>
        <button onClick={logIn} children='Log In' />
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/harrysolovay/blappy'
          children='Source'
        />
      </div>
    </Container>
  )
}, true)
