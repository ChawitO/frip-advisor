import React from 'react'
import moment from 'moment'

const getDurationText = (duration) => (
  `${Math.floor(duration / 60)}h ${duration % 60}m`
)

const getStopText = (stopCount) => (
  (stopCount > 1) ? `${stopCount} stops` : (stopCount === 1) ? `${stopCount} stop` : 'direct'
)

const getDayDiff = (segsets, segments) => (
  moment(segsets[segments[segments.length - 1]].arriveTimeAirport.split(' ')[0])
    .diff(moment(segsets[segments[0]].leaveTimeAirport.split(' ')[0]), 'days')
)

const FlightSummary = ({ flight, segsets, airlines, airlineLogo: { host, url } }) => {
  console.log(flight)
  return (
    <div className='container flight-wrapper'>
      <div className='info'>
        {flight.legs.map(({ id, duration, segments }, i) => {
          const airlineCodes = new Set(segments.map(seg => segsets[seg].airlineCode))
          const imgClass = airlineCodes.size > 1 ? 'multi' : ''
          return (
            <div key={id} className='flight-summary'>
              <figure>
                {[...airlineCodes].map(code => <img key={code} className={imgClass} src={`${host[code]}${url[code]}`} alt={`${code} logo`}/>)}
              </figure>
              <div>
                <div>{segsets[segments[0]].leaveTimeAirport.split(' ')[1]} - {segsets[segments[segments.length - 1]].arriveTimeAirport.split(' ')[1]}{getDayDiff(segsets, segments) ? <sup>+{getDayDiff(segsets, segments)}</sup> : ''}</div>
                <div>{airlineCodes.size > 1 ? 'Multiple Airlines' : airlines[[...airlineCodes][0]]}</div>
              </div>
              <div>
                <div>{getStopText(segments.length - 1)}</div>
                <div>{segments.map((seg, j, arr) => (j < arr.length - 1) ? segsets[seg].destinationCode : null).filter(ap => !!ap).join(', ')}</div>
              </div>
              <div>
                <div>{getDurationText(duration)}</div>
                <div>{flight.flightRoutes[i].originAirport} - {flight.flightRoutes[i].destinationAirport}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='price'>
        <h4>{flight.displayLowTotal}</h4>
        <h6>{flight.cheapestProviderName}</h6>
        <a className='button is-info' href={`https://www.kayak.co.uk${flight.shareURL}`} target='_blank' rel="noopener noreferrer">View Deal</a>
      </div>
    </div>
  )
}

export default FlightSummary