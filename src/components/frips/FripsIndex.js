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
      <section className='section-index'>
        
        <h1 className='subtitle is-3 has-text-centered'>My Personal Frips</h1>
        
        <div className='trip-link'>
          <Link to='/frips/new' className='scale'>
            <p className="fas fa-plane-departure"> Start planning your next Frip</p>
          </Link>
        </div>
        <hr />
        <div className='personal-frip'>
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
                  {moment(frip.departureDate).format('Do MMM YY')} -{' '}
                  {moment(frip.returnDate).format('Do MMM YY')}
                </p>
                
                <p>Created by {frip.creator.username}</p>
              </div>
            ))}
        </div>
      </section>
    )
  }
}
