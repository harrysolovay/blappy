import React from 'react'
import styled from 'styled-components'
import {asPage} from '../components'
import {Link} from 'react-router-dom'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .heading {
    font-size: 36px;
    line-height: 54px;
  }

  .subtitle {
    font-size: 24px;
    line-height: 36px;
  }

  a {
    display: block;
    font-size: 24px;
    line-height: 36px;
  }
`

export default asPage(() => (
  <Container>
    <div className='heading' children='404' />
    <div className='subtitle' children='page not found' />
    <Link to='/' children='go home' />
  </Container>
))
