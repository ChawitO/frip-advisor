import React from 'react'
import axios from 'axios'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      searchCities: '',
      cities: null,
      hotels: null
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  onSearch(name, path, e) {
    if (e) e.preventDefault()
    const params = {
      searchCities: { languagecode: 'en', text: this.state.searchCities },
      searchHotels: { price_filter_currencycode: 'GBP', travel_purpose: 'leisure', search_id: 'none', order_by: 'popularity', languagecode: 'en', search_type: 'city', offset: 0, guest_qty: 1, arrival_date: '2020-03-13', departure_date: '2020-03-15', room_qty: 1 }
    }
    console.log('onSearch func')
    const key = name.replace('search', '').toLowerCase()
    axios.get(`/api${path}`, { params: params[name] })
      .then(res => this.setState({ hotels: null, [key]: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    const { searchCities, cities, hotels } = this.state
    return (
      <section>
        <h1>Frip Advisor Home Page</h1>
        <form onSubmit={(e) => this.onSearch('searchCities', '/cities', e)}>
          <input name='searchCities' onChange={this.onChange} value={searchCities} placeholder='search here for destination city'/>
          <button type='submit'>Search</button>
        </form>
        {cities && cities.map(city => (
          <div key={city.dest_id} onClick={() => this.onSearch('searchHotels', `/cities/${city.dest_id}/hotels`)}>
            <img src={city.image_url} alt={`image of ${city.name}`}/>
            <h4>{city.name}</h4>
          </div>
        ))}
        {hotels && hotels.result.map(hotel => (
          <div key={hotel.hotel_id}>
            <img src={hotel.main_photo_url} alt={`image of ${hotel.hotel_name} hotel`}/>
            <h4>{hotel.hotel_name}</h4>
            <h6>{hotel.address}</h6>
          </div>
        ))}
      </section>
    )
  }
}