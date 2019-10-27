import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

export default class FripsNew extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        name: '',
        originCity: 'London',
        originCityId: '-2601889',
        searchCities: '',
        destinationCity: '',
        destinationCityId: '',
        departureDate: new Date().toISOString().slice(0, 10),
        returnDate: ''
      }
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  onChange({ target: { name, value } }) {
    this.setState({ data: { ...this.state.data, [name]: value } })
  }

  onSubmit(e) {
    e.preventDefault()
    axios.post('/api/frips', this.state.data, { headers: { Authorization: `Bearer ${Auth.getToken()}` } })
      .then(res => this.props.history.push(`/frips/${res.data._id}`))
      .catch(err => console.log(err))
  }

  onSearch() {
    axios.get('/api/cities', { params: { languagecode: 'en', text: this.state.data.searchCities } })
      .then(res => {
        const city = res.data.find(loc => loc.dest_type === 'city')
        this.setState({ data: { ...this.state.data, searchCities: city.label, destinationCity: city.city_name, destinationCityId: city.dest_id } })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { name, originCity, searchCities, departureDate, returnDate } = this.state.data
    return (
      <section className='section'>
        <div className='container'>
          <form onSubmit={this.onSubmit}>
            <h2 className='title'>Create new Frip</h2>
            <label className='label'>Name</label>
            <div className='field'>
              <div className='control'>
                <input
                  className='input'
                  name='name'
                  placeholder='Frip name'
                  value={name}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <label className='label'>Origin City</label>
            <div className='field'>
              <div className='control'>
                <input
                  className='input'
                  name='originCity'
                  placeholder='Origin city'
                  value={originCity}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <label className='label'>Destination City</label>
            <div className='field has-addons'>
              <div className='control is-expanded'>
                <input
                  className='input'
                  name='searchCities'
                  placeholder='Destination city'
                  value={searchCities}
                  onChange={this.onChange}
                />
              </div>
              <div className='control'>
                <button className='button is-primary' type='button' onClick={this.onSearch}>Search</button>
              </div>
            </div>
            <label className='label'>Departure Date</label>
            <div className='field has-addons'>
              <div className='control is-expanded'>
                <input
                  className='input'
                  type='date'
                  name='departureDate'
                  placeholder='Departure date'
                  value={departureDate}
                  onChange={this.onChange}
                />
              </div>
              <div className='control is-expanded has-text-centered'>To</div>
              <div className='control is-expanded'>
                <input
                  className='input'
                  type='date'
                  name='returnDate'
                  placeholder='Return date'
                  value={returnDate}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <button type="submit" className="button is-fullwidth is-primary">Add your Frip</button>
          </form>
        </div>
      </section>
    )
  }
}