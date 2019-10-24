import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import Home from './components/Home'
import Register from './components/auth/Register'

const App = () => (
  <BrowserRouter>
    <>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/register'>Register</Link>
      </nav>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/register' component={Register} />
      </Switch>
    </>
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('root'))