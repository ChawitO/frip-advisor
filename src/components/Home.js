import React from 'react'
import axios from 'axios'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      searchCities: '',
      cities: null
    }

    this.onChange = this.onChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  onSearch(e) {
    e.preventDefault()
    axios.get(`/api${e.target.getAttribute('api')}`, { params: { languagecode: 'en', text: this.state.searchCities } })
      .then(res => this.setState({ cities: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    const { searchCities, cities } = this.state
    return (
      <section>
        <h1>Frip Advisor Home Page</h1>
        <form onChange={this.onChange} onSubmit={this.onSearch} api='/cities'>
          <input name='searchCities' value={searchCities} placeholder='search here for destination city'/>
          <button type='submit'>Search</button>
        </form>
        {cities && cities.map(city => (
          <div key={city.dest_id}>
            <img src={city.image_url} alt={`image of ${city.name}`}/>
            <h4>{city.name}</h4>
            <h6></h6>
          </div>
        ))}
      </section>
    )
  }
}