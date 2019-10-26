import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class FripsIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      frips: null
    }
  }

  componentDidMount() {
    axios.get('/api/trips')
      .then(res => this.setState({ frips: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    const { frips } = this.state
    return (
      <section>
        <h1>Frip Index page</h1>
        <Link to='/frips/new'>New Frip</Link>
        {frips && frips.map(frip => (
          <div key={frip._id} className='content'>
            <h4>{frip.hotel} - {frip.city}</h4>
            <p>{frip.departureDate} - {frip.arrivalDate}</p>
          </div>
        ))}
      </section>

    )
  }
}