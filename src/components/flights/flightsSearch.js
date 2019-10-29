import React from 'react'
import axios from 'axios'
import AsyncSelect from 'react-select/async'

const searchAirports = (...params) => {
  console.log(params)
  return axios.get('/api/locations', { params: { where: params[0] } })
    .then(res => res.data
      .filter(loc => loc.loctype === 'ap')
      .map(loc => ({ value: loc.apicode, label: loc.apicode }))
    )
    .catch(err => console.log(err))
}

export default class FlightsSearch extends React.Component {
  constructor() {
    super()
    this.state = {
      fromAirports: null,
      toAirports: null,
      departureDate: new Date().toISOString().slice(0, 10),
      returnDate: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSearchFlights = this.onSearchFlights.bind(this)
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  onSearch(location) {
    axios.get('/api/locations', { params: { where: location } })
      .then(res => this.setState({ fromAirports: res.data.filter(e => e.loctype === 'ap') }))
      .catch(err => console.log(err))
  }

  onSearchFlights(e) {
    e.preventDefault()

    const params = {
      origin2: this.state.toAirports,
      departdate2: this.state.returnDate,
      destination2: this.state.fromAirports,
      origin1: this.state.fromAirports,
      destination1: this.state.toAirports,
      departdate1: this.state.departureDate,
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
      <>
        <section className='section'>
          <h1>Flight Search Page</h1>
          <form onSubmit={this.onSearchFlights}>
            <div className='field is-grouped'>
              <div className='control is-expanded'>
                <AsyncSelect placeholder='From' cacheOptions defaultOptions loadOptions={searchAirports} onChange={({ value }) => this.setState({ fromAirports: value })}/>
              </div>
              <div className='control is-expanded'>
                <AsyncSelect placeholder='To' loadOptions={searchAirports} onChange={({ value }) => this.setState({ toAirports: value })} />
              </div>
            </div>
            <div className='field is-grouped'>
              <div className='control is-expanded'>
                <input type='date' className='input' onChange={(e) => this.onChange(e)} name='departureDate' value={this.state.departureDate} />
              </div>
              <div className='control is-expanded'>
                <input type='date' className='input' onChange={(e) => this.onChange(e)} name='returnDate' />
              </div>
            </div>
            <button type='submit' className='button is-info'>Submit</button>
          </form>
        </section>
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
                        <p>{codeShares.legSegments[j].laydur ? `Change plane in ${f.destinationCode}, layover duration: ${codeShares.legSegments[j].laydur}` : ''}</p>
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
      </>
    )
  }
}