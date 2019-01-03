// import GithubCorner from 'react-github-corner'
import {GlobalStyle} from '~/components'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Landing, Boards, Board, FourOFour} from '~/pages'
import {render} from 'react-dom'
import {unregisterServiceWorker} from '~/utilities'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={Landing} />
            <Route path="/boards" component={Boards} />
            <Route path="/board/:id" component={Board} />
            <Route component={FourOFour} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  )
}

render(<App />, document.getElementById('root'))
unregisterServiceWorker()
