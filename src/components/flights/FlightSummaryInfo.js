import React from 'react'
import moment from 'moment'

const getStopText = (stopCount) => (
  (stopCount > 1) ? `${stopCount} stops` : (stopCount === 1) ? `${stopCount} stop` : 'direct'
)

const getDayDiff = (segsets, segments) => (
  moment(segsets[segments[segments.length - 1]].arriveTimeAirport.split(' ')[0], 'yyyy/mm/dd HH:mm')
    .diff(moment(segsets[segments[0]].leaveTimeAirport.split(' ')[0], 'yyyy/mm/dd HH:mm'), 'days')
)

const FlightSummaryInfo = ({ segsets, segments, duration, i, host, url, airlines, flight }) => {
  const airlineCodes = [...new Set(segments.map(seg => segsets[seg].airlineCode))]
  const imgClass = airlineCodes.length > 1 ? 'multi' : ''
  const departTime = segsets[segments[0]].leaveTimeAirport.split(' ')[1]
  const arriveTime = segsets[segments[segments.length - 1]].arriveTimeAirport.split(' ')[1]
  const dayDiff = getDayDiff(segsets, segments)
  const stopText = getStopText(segments.length - 1)
  const stopoverAirports = segments.map(seg => segsets[seg].destinationCode).slice(0, -1).join(', ')
  const durationText = `${Math.floor(duration / 60)}h ${duration % 60}m`

  return (
    <div className='flight-summary'>
      <figure>
        {airlineCodes.map(code => (
          <img key={code} className={imgClass} src={`${host[code]}${url[code]}`} alt={`${code} logo`} />
        ))}
      </figure>
      <div>
        <div>{departTime} - {arriveTime}{!!dayDiff && <sup>+{dayDiff}</sup>}</div>
        <div>{airlineCodes.length > 1 ? 'Multiple Airlines' : airlines[airlineCodes[0]]}</div>
      </div>
      <div>
        <div>{stopText}</div>
        <div>{stopoverAirports}</div>
      </div>
      <div>
        <div>{durationText}</div>
        <div>{flight.flightRoutes[i].originAirport} - {flight.flightRoutes[i].destinationAirport}</div>
      </div>
    </div>
  )
}

export default FlightSummaryInfo