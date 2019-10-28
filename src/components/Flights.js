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
      <section>
        <h1>Flights index page</h1>
        {flights && flights.map(flight => (
          <div key={flight.tripid} className='content'>
            <h4><a href={`https://www.kayak.co.uk${flight.shareURL}`}>{flight.cheapestProviderName} - {flight.displayLowTotal}</a></h4>
            <p>{flight.flightRoutes[0].originAirport} - {flight.flightRoutes[0].destinationAirport}</p>
            {flight.legs.map((leg, i) => (
              <div key={leg.id}>
                <p>{this.getDurationText(leg.duration)} total</p>
                {leg.segments.map((seg, j) => {
                  const f = data.segset[seg]
                  const codeShares = flight.codeShares[i]
                  return (
                    <div key={seg}>
                      <p>{data.airlines[f.airlineCode]} {f.flightNumber} | {f.leaveTimeAirport.split(' ')[0]}</p>
                      <p>{f.originCode} - {f.destinationCode}</p>
                      <p>{f.leaveTimeAirport.split(' ')[1]} - {f.arriveTimeAirport.split(' ')[1]} | class {f.cabinClass} | {this.getDurationText(f.duration)}</p>
                      <p>{codeShares.legSegments[j].laydur ? `Change plane in ${f.destinationCode}, layover duration: ${codeShares.legSegments[j].laydur}`  : ''}</p>
                      <br />
                    </div>
                  )
                })}
                <hr />
              </div>
            ))}
            <hr />
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