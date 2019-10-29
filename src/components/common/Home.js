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
    
    return (
      <section className="section_home">
        <h1>Frip Advisor Home Page</h1>
        <img src="./assets/images/Skyline.jpg"/>
      </section>
    )
  }
}