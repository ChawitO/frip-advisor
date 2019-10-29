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
  const [outboundFlight, inboundFlight] = flight.legs
  return (
    <div>
      <h4>
        <a href={`https://www.kayak.co.uk${flight.shareURL}`}>{flight.cheapestProviderName} - {flight.displayLowTotal}</a>
      </h4>
      {flight.legs.map(({ id, duration, segments }, i) => {
        const airlineCodes = new Set(segments.map(seg => segsets[seg].airlineCode))
        return (
          <div key={id} className='flight-summary'>
            {/* <img src={`${host[segsets[segments[0]].airlineCode]}${url[segsets[segments[0]].airlineCode]}`} /> */}
            {[...airlineCodes].map(code => (
              <img key={code} src={`${host[segsets[segments[0]].airlineCode]}${url[segsets[segments[0]].airlineCode]}`}/>
            ))}
            <p>{getDurationText(duration)}</p>
            <p>{flight.flightRoutes[i].originAirport} - {flight.flightRoutes[i].destinationAirport}</p>
            <p>{getStopText(segments.length - 1)}</p>
            <p>{segsets[segments[0]].leaveTimeAirport.split(' ')[1]} - {segsets[segments[segments.length - 1]].arriveTimeAirport.split(' ')[1]}{getDayDiff(segsets, segments) ? <sup>+{getDayDiff(segsets, segments)}</sup> : ''}</p>
            <p>{airlineCodes.size ? airlines[[...airlineCodes][0]] : 'Multiple Airlines'}</p>
            <p>{segments.map((seg, j, arr) => (j < arr.length - 1) ? segsets[seg].destinationCode : null).filter(ap => !!ap).join(', ')}</p>
          </div>
        )
      })}
    </div>
  )
}

export default FlightSummary