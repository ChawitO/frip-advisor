/* eslint-disable camelcase */
import React from 'react'

const RestaurantList = ({ name, url, location, thumb, establishment, cuisines, average_cost_for_two, currency, timings, user_rating }) => (
  <a href={url} target='_blank' rel='noopener noreferrer'>
    {console.log(url)}
    <li className='restaurant'>
      <img src={thumb} />
      <div>
        <h4>{name}</h4>
        <p>{location.locality}</p>
        <p className='type'>{establishment}</p>
        <div className='rating-wrapper'>
          <div className='rating' style={{ backgroundColor: `#${user_rating.rating_color}` }}>{user_rating.aggregate_rating}</div>
          <span>{user_rating.votes} votes</span>
        </div>
      </div>
      <div className='details'>
        <div>
          <p>Cuisines:</p>
          <p>{cuisines}</p>
        </div>
        <div>
          <p>Cost for Two:</p>
          <p>{currency}{average_cost_for_two}</p>
        </div>
        <div>
          <p>Hours:</p>
          <p>{timings}</p>
        </div>
      </div>
    </li>
  </a>
)

export default RestaurantList