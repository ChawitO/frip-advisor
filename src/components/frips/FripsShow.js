import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import moment from 'moment'

export default class FripsShow extends React.Component {
  constructor() {
    super()
    this.state = {
      frip: null,
      hotels: null
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
    const id = this.props.match.params.id
    axios
      .get(`/api/frips/${id}/hotels`)
      .then(res => this.setState({ hotels: res.data }))
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
    axios
      .post(`/api/frips/${id}/hotels`, data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.getFripData())
      .catch(err => console.log(err))
  }

  searchFlights() {
    console.log('ehh')
  }

  getBiggerImage(url) {
    const splitUrl = url.split('/')
    splitUrl[6] = 'square200'
    return splitUrl.join('/')
  }

  render() {
    console.log(this.state)
    const { frip, hotels } = this.state
    return (
      <section
        className='section-show
      '
      >
        <div className='box-showpage'> 
          {/* <h1>Your choices</h1> */}
          {frip && (
            <div className='content-show'>
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
              <button className='search-hotel' onClick={() => this.getHotels()}>
                Search Hotels
              </button>
            </div>
          )}
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
        <hr className="line-break" />
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
