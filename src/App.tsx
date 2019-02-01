import React, {lazy, Suspense} from 'react'
import {GlobalStyle} from './components'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

const Landing = lazy(() => import('./pages/Landing'))
const Boards = lazy(() => import('./pages/Boards'))
const Board = lazy(() => import('./pages/Board'))
const FourOFour = lazy(() => import('./pages/404'))

export default () => (
  <Suspense fallback={<div>loading...</div>}>
    <GlobalStyle />
    <BrowserRouter>
      <Switch>
        <Route exact={true} path='/' component={Landing} />
        <Route path='/boards' component={Boards} />
        <Route path='/board/:id' component={Board} />
        <Route component={FourOFour} />
      </Switch>
    </BrowserRouter>
  </Suspense>
)
