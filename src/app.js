import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './style.scss'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Flights from './components/Flights'
import FlightsSearch from './components/flights/FlightsSearch'
import Frips from './components/frips/FripsIndex'
import FripsNew from './components/frips/FripsNew'
import FripsShow from './components/frips/FripsShow'

const App = () => (
  <BrowserRouter>
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path='/flights' component={Flights} />
        <Route path='/flightssearch' component={FlightsSearch} />
        <Route path='/frips/new' component={FripsNew} />
        <Route path='/frips/:id' component={FripsShow} />
        <Route path='/frips' component={Frips} />
      </Switch>
      <Footer />
    </>
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('root'))