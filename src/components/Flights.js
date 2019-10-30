import React from 'react'
import axios from 'axios'

import FlightSummary from './flights/FlightSummary'

export default class Flights extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null,
      flights: null
    }
  }

  componentDidMount() {
    const params = {
      origin2: 'FCO',
      departdate2: '2020-03-15',
      destination2: 'LHR',
      origin1: 'LHR',
      destination1: 'FCO',
      departdate1: '2020-03-13',
      cabin: 'e',
      currency: 'GBP',
      adults: '1',
      bags: '1'
    }

    axios.get('/api/flights?', { params })
      .then(res => this.setState({ data: res.data, flights: res.data.tripset }))
      .catch(err => console.log(err))
  }

  getDurationText(duration) {
    return `${Math.floor(duration / 60)}h ${duration % 60}m`
  }

  getStopText(stopCount) {
    return stopCount > 1 ? `${stopCount} stops` : stopCount === 1 ? `${stopCount} stop` : 'direct'
  }

  render() {
    console.log(this.state)
    const { flights, data } = this.state
    return (
      <section className='section'>
        <h1>Flights index page</h1>
        {flights && flights.map(flight => (
          <FlightSummary key={flight.tripid} flight={flight} segsets={data.segset} airportDetails={data.airportDetails} airlines={data.airlines} airlineLogo={{ url: data.airlineLogos, host: data.airlineLogosHosts }}/>
        ))}
      </section>
    )
  }
}
