import React from 'react'
import axios from 'axios'
import RestaurantList from '../restaurants/RestaurantList'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      searchCities: '',
      cities: null,
      hotels: null,
      selectedCity: '61',
      selectedCuisines: [],
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
      entity_id: this.state.selectedCity,
      entity_type: 'city',
      q: this.state.searchTerm,
      cuisines: this.state.selectedCuisines.join(',')
    }

    axios.get('/api/restaurants', { params })
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
        <section>
          <form onSubmit={this.getRestaurants}>
            <input name='searchTerm' placeholder='search restaurants...' />
            <button type='submit'>Search</button>
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