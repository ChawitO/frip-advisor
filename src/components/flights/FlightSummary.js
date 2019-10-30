import React from 'react'

import FlightSummaryInfo from './FlightSummaryInfo'
import FlightDetail from './FlightDetail'

const toggleHide = (id) => {
  document.getElementById(`${id}`).classList.toggle('hide')
}

const FlightSummary = ({ flight, segsets, airportDetails,  airlines, airlineLogo: { host, url } }) => (
  <div className='flight-wrapper'>
    <div className='flight-overview' onClick={() => toggleHide(flight.tripid)}>
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
    <div className='flight-detail hide' id={flight.tripid}>
      {flight.legs.map(({ id, duration, segments }, i) => {
        const headerTexts = ['Depart', 'Return']
        const flightRoute = `${flight.flightRoutes[i].originAirport} - ${flight.flightRoutes[i].destinationAirport}`
        const durationText = `${Math.floor(duration / 60)}h ${duration % 60}m`
        const legSegments = flight.codeShares[i].legSegments

        const flights = segments.map(seg => segsets[seg])
        return (
          <div key={id}>
            <div className='flight-detail-header'>
              <h5>{headerTexts[i]}<span>{flightRoute}</span></h5>
              <div>{durationText}</div>
            </div>
            <div className='flight-detail-body'>
              <FlightDetail {...{ flights, airportDetails, legSegments, host, url }} />
            </div>
          </div>
        )
      })}
    </div>
  </div>
)

export default FlightSummary