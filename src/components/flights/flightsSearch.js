import React from 'react'
import axios from 'axios'
import AsyncSelect from 'react-select/async'

import FlightSummary from './FlightSummary'
import Spinner from '../common/Spinner'

const searchAirports = (...params) => {
  return axios.get('/api/locations', { params: { where: params[0] } })
    .then(res => res.data
      .filter(loc => loc.loctype === 'ap')
      .map(loc => ({ value: loc.apicode, label: loc.displayname }))
    )
    .catch(err => console.log(err))
}

const currentDate = new Date().toISOString().slice(0, 10)

export default class FlightsSearch extends React.Component {
  constructor() {
    super()
    this.state = {
      fromAirports: null,
      toAirports: null,
      departureDate: currentDate,
      returnDate: '',
      flights: null,
      data: null,
      loading: false,
      oAirport: null,
      dAirport: null
    }

    this.onChange = this.onChange.bind(this)
    this.onSearchFlights = this.onSearchFlights.bind(this)
  }

  componentDidMount() {
    const { origin, destination } = this.props.match.params
    if (origin && destination) {
      axios.get('/api/locations', { params: { where: origin } })
        .then(res => res.data.find(({ loctype }) => loctype === 'ap' ))
        .then(airport => this.setState({ fromAirports: airport.apicode, oAirport: { value: airport.apicode, label: airport.displayname } }))
        .catch(err => console.log(err))

      axios.get('/api/locations', { params: { where: destination } })
        .then(res => res.data.find(({ loctype }) => loctype === 'ap' ))
        .then(airport => this.setState({ toAirports: airport.apicode, dAirport: { value: airport.apicode, label: airport.displayname } }))
        .catch(err => console.log(err))
    }
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value })
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

    this.setState({ loading: true })
    axios.get('/api/flights?', { params })
      .then(res => this.setState({ data: res.data, flights: res.data.tripset, loading: false }))
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
    const { flights, data, departureDate, loading, oAirport, dAirport } = this.state
    return (
      <main className='flight-search'>
        <section className="section flight-search-form">
          <div className="container">
            <h2 className="title">Flight Search Page</h2>
            <form onSubmit={this.onSearchFlights}>
              <div className='field is-grouped'>
                <div className='control is-expanded'>
                  <AsyncSelect placeholder='From' value={oAirport} cacheOptions defaultOptions loadOptions={searchAirports} onChange={airport => this.setState({ oAirport: airport, fromAirports: airport.value })}/>
                </div>
                <div className='control arrow-icon'>
                  <i className='fas fa-arrows-alt-h'></i>
                </div>
                <div className='control is-expanded'>
                  <AsyncSelect placeholder='To' value={dAirport} loadOptions={searchAirports} onChange={(airport) => this.setState({ dAirport: airport, toAirports: airport.value })} />
                </div>
                <div className='control'>
                  <input type='date' className='input' onChange={(e) => this.onChange(e)} name='departureDate' value={this.state.departureDate} min={currentDate}/>
                </div>
                <div className='control'>
                  <input type='date' className='input' onChange={(e) => this.onChange(e)} name='returnDate' min={departureDate}/>
                </div>
                <button type='submit' className='button is-info'><i className='fas fa-search'></i></button>
              </div>
            </form>
          </div>
        </section>
        <section className="section flight-result-display">
          <div className="Loader">
            {loading && <Spinner />}
          </div>
          {flights && 
            <div className='container'>
              <h1 className="subtitle">Flight Search Results</h1>
              {flights.map(flight => (
                <FlightSummary key={flight.tripid} {...data} flight={flight} segsets={data.segset} airlineLogo={{ url: data.airlineLogos, host: data.airlineLogosHosts }} />
              ))}
            </div>
          }
        </section>
      </main>
    )
  }
}