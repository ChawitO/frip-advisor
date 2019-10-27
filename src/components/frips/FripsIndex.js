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
    axios.get('/api/frips')
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
            <h3>{frip.name}</h3>
            <h4>{frip.originCity} to {frip.destinationCity}</h4>
            <p>{frip.departureDate} - {frip.returnDate}</p>
            <p>by {frip.creator.username}</p>
          </div>
        ))}
      </section>

    )
  }
}