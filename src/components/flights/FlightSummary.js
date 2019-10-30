import React from 'react'

import FlightSummaryInfo from './FlightSummaryInfo'

const FlightSummary = ({ flight, segsets, airlines, airlineLogo: { host, url } }) => (
  <div className='container flight-wrapper'>
    <div className='info'>
      {flight.legs.map(({ id, duration, segments }, i) => (
        <FlightSummaryInfo key={id} {...{ flight, segsets, segments, duration, host, url, airlines, i }} />
      ))}
    </div>
    <div className='price'>
      <h4>{flight.displayLowTotal}</h4>
      <h6>{flight.cheapestProviderName}</h6>
      <a className='button is-info' href={`https://www.kayak.co.uk${flight.shareURL}`} target='_blank' rel="noopener noreferrer">View Deal</a>
    </div>
  </div>
)

export default FlightSummary