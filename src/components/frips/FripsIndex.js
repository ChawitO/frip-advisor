import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default class FripsIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      frips: null
    }
  }

  componentDidMount() {
    axios
      .get('/api/frips')
      .then(res => this.setState({ frips: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    const { frips } = this.state
    return (
      <section className="section-index">
        <div className="container">
          <h1 className="subtitle is-3 has-text-centered">My Personal Frips</h1>
          
          <Link to='/frips/new' id="trip-link">Start creating your new Frip</Link>
        </div>
        <div className="personal-frip">
          {frips &&
          frips.map(frip => (
            <div key={frip._id} className='content-index'>
              <h3>
                <Link to={`/frips/${frip._id}`}>{frip.name}</Link>
              </h3>
              <h4>
                {frip.originCity} to {frip.destinationCity}
              </h4>
              <p>
                {moment(frip.departureDate).format('Do MMM YY')} - {moment(frip.returnDate).format('Do MMM YY')}
              </p>
              <p>by {frip.creator.username}</p>
            </div>
            
          ))}
        </div>
      </section>
    )
  }
}
