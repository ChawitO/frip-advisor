import React from 'react'
import axios from 'axios'

export default class FripsShow extends React.Component {
  constructor() {
    super()
    this.state = {
      frip: null
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`/api/frips/${id}`)
      .then(res => this.setState({ frip: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    const { frip } = this.state
    return (
      <section>
        <h1>Frips Show Page</h1>
        {frip &&
          <div className='content'>
            <h2>{frip.name}</h2>
            <h4>{frip.originCity} to {frip.destinationCity}</h4>
            <p>{frip.departureDate} - {frip.returnDate}</p>
            <p>by {frip.creator.username}</p>
          </div>
        }
      </section>
    )
  }
}