import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import moment from 'moment'
import Spinner from '../common/Spinner'

export default class FripsShow extends React.Component {
  constructor() {
    super()
    this.state = {
      frip: null,
      hotels: null,
      loading: false
    }
  }

  componentDidMount() {
    this.getFripData()
  }

  getFripData() {
    const id = this.props.match.params.id
    axios
      .get(`/api/frips/${id}`)
      .then(res => this.setState({ frip: res.data, hotels: null }))
      .catch(err => console.log(err))
  }

  getHotels() {
    this.setState({ loading: true })
    const id = this.props.match.params.id
    axios
      .get(`/api/frips/${id}/hotels`)
      .then(res => this.setState({ hotels: res.data, loading: false }))
      .catch(err => console.log(err))
  }

  assignHotel(hotel) {
    const data = {
      name: hotel.hotel_name,
      id: hotel.hotel_id,
      checkInDate: this.state.frip.departureDate,
      checkOutDate: this.state.frip.returnDate,
      address: hotel.address_trans,
      city: hotel.city_trans,
      country: hotel.country_trans,
      url: hotel.url,
      image: hotel.main_photo_url
    }

    const id = this.props.match.params.id
    this.setState({ loading: true })
    axios
      .post(`/api/frips/${id}/hotels`, data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.getFripData())
      .catch(err => console.log(err))
  }

  searchFlights() {
    const { originCity, destinationCity } = this.state.frip
    this.props.history.push(`/flightssearch/${originCity}/${destinationCity}`)
  }

  getBiggerImage(url) {
    const splitUrl = url.split('/')
    splitUrl[6] = 'square200'
    return splitUrl.join('/')
  }

  render() {
    console.log(this.state)
    const { frip, hotels, loading } = this.state
    if (frip && frip.weatherForecast) {
      console.log(frip.weatherForecast)
    }
    return (
      <section className='section-show'>
        <div className='box-showpage'>
          {frip && (
            <div className='content-show'>
              <div className='frip-details'>
                <h1 className='subtitle is 3 has-text-centered'>
                  {' '}
                  <strong>Frip details</strong>
                </h1>
                <h2>
                  <strong>Frip name:</strong> {frip.name}
                </h2>
                <h4>
                  <strong> Destination: </strong>
                  {frip.originCity} to {frip.destinationCity}
                </h4>
                <p>
                  <strong>Date:</strong>{' '}
                  {moment(frip.departureDate).format('Do MMM YY')} -{' '}
                  {moment(frip.returnDate).format('Do MMM YY')}
                </p>
                <p>
                  {' '}
                  <strong>Created by</strong> {frip.creator.username}
                </p>

                <button
                  className='search-hotel'
                  onClick={() => this.getHotels()}
                >
                  Search Hotels
                </button>
                <button className='search-flight' onClick={() => this.searchFlights()}>
                  Search Flights
                </button>
              </div>
              <hr />
              <div className='weather-forecast'>
                <h1 className='subtitle is 3 has-text-centered'>
                  <strong> Live Weather Forecast</strong>
                </h1>
                <p>
                  <strong>Overall forecast: </strong>
                  {frip.weatherForecast.icon}
                </p>
                <div>
                  <p className='fas fa-temperature-low'>
                    
                    MIN-MAX {frip.weatherForecast.temperatureLow} -{' '}
                    {frip.weatherForecast.temperatureHigh} °F
                  </p>
                  <p className='fas fa-temperature-high'></p>
                </div>
                <p className='fas fa-wind'> {frip.weatherForecast.windSpeed}</p>
              </div>
            </div>
          )}
          {loading &&
            <div className="Loader">
              {console.log('spinning')}
              <Spinner />
            </div>
          }
          {frip &&
            frip.hotels.map(hotel => (
              <div key={hotel.id} className='hotels-show'>
                <img
                  src={this.getBiggerImage(hotel.image)}
                  alt={`image of ${hotel.name} hotel`}
                />
                <h4>
                  <a href={hotel.url} target='_blank' rel='noopener noreferrer'>
                    {hotel.name}
                  </a>
                </h4>
                <h6>
                  {hotel.address}, {hotel.city}, {hotel.country}
                </h6>
              </div>
            ))}
        </div>
        <hr className='line-break' />
        <div className='assign-hotel'>
          {hotels &&
            hotels.result.map(hotel => (
              <div className='direction' key={hotel.hotel_id}>
                <img
                  src={this.getBiggerImage(hotel.main_photo_url)}
                  alt={`image of ${hotel.hotel_name} hotel`}
                />
                <h4>{hotel.hotel_name}</h4>
                <h6>
                  {hotel.address_trans}, {hotel.city_trans},{' '}
                  {hotel.country_trans}
                </h6>
                <button onClick={() => this.assignHotel(hotel)}>Assign</button>
              </div>
            ))}
        </div>
      </section>
    )
  }
}
