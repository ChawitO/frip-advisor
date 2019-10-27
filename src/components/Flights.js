import React from 'react'
import axios from 'axios'

export default class Flights extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null,
      flights: null
    }
  }

  componentDidMount() {
    axios.get('/api/flights?origin1=LHR&destination1=FCO&departdate1=2020-03-13&cabin=e&currency=GBP&adults=1&bags=1', { params: {} })
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
    const { flights } = this.state
    return (
      <section>
        <h1>Flights index page</h1>
        {flights && flights.map(flight => (
          <div key={flight.tripid} className='content'>
            <h4>{flight.cheapestProviderName} - {flight.displayLowTotal}</h4>
            <a href={`https://www.kayak.co.uk${flight.shareURL}`}>{flight.flightRoutes[0].originAirport} - {flight.flightRoutes[0].destinationAirport}</a>
            <p>{this.getDurationText(flight.duration)} | {this.getStopText(flight.maxstops)}</p>
          </div>
        ))}
      </section>
    )
  }
}

// flight segments
/*
  flight.legs[0].segments.map(seg => {
    const f = data.segset[seg]
    return (
      <div key={seg}>
        <p>{f.leaveTimeDisplay} - {f.arriveTimeDisplay}</p>
        <p>{f.originCode} - {f.destinationCode}</p>
      </div>
    )
  })
*/