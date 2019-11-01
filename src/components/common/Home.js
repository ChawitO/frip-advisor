import React from 'react'
import axios from 'axios'
import RestaurantList from '../restaurants/RestaurantList'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      searchCity: '',
      restaurantSuggestions: null
    }

    this.onChange = this.onChange.bind(this)
    this.getRestaurants = this.getRestaurants.bind(this)
  }

  componentDidMount() {
    this.getRestaurants()
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  getRestaurants(e) {
    if (e) e.preventDefault()

    const params = {
      entity_type: 'city',
      q: this.state.searchTerm
    }

    axios
      .get('/api/zomatocities', { params: { q: this.state.searchCity || 'london' } })
      .then(({ data }) => axios.get('/api/restaurants', { params: { ...params, entity_id: data.location_suggestions[0].id } }))
      .then(res => this.setState({ restaurantSuggestions: res.data.restaurants }))
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    const { restaurantSuggestions } = this.state
    return (
      <main>
        <section className="section_home">
          <img src="./assets/images/Skyline.jpg"/>
        </section>
        <section className='section'>
          <form className='container' onSubmit={this.getRestaurants}>
            <div className='field has-addons'>
              <div className='control is-expanded'>
                <input className='input' name='searchCity' placeholder='search city...' onChange={this.onChange}/>
              </div>
              <div className='control is-expanded'>
                <input className='input' name='searchTerm' placeholder='search restaurants...' onChange={this.onChange}/>
              </div>
              <div className='control'>
                <button className='button is-primary' type='submit'>Search</button>
              </div>
            </div>
          </form>
        </section>
        {restaurantSuggestions &&
          <section className='section'>
            <ul className='container'>
              {restaurantSuggestions.map(({ restaurant }) => (
                <RestaurantList key={restaurant.id} {...restaurant} />
              ))}
            </ul>
          </section>
        }
      </main>
    )
  }
}