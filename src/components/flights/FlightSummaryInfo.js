import React from 'react'
import moment from 'moment'

const getStopText = (stopCount) => (
  (stopCount > 1) ? `${stopCount} stops` : (stopCount === 1) ? `${stopCount} stop` : 'direct'
)

const FlightSummaryInfo = ({ segsets, segments, duration, i, host, url, airlines, flight }) => {
  const airlineCodes = [...new Set(segments.map(seg => segsets[seg].airlineCode))]
  const imgClass = airlineCodes.length > 1 ? 'multi' : ''
  const departTime = segsets[segments[0]].leaveTimeAirport.split(' ')[1]
  const arriveTime = segsets[segments[segments.length - 1]].arriveTimeAirport.split(' ')[1]
  const stopText = getStopText(segments.length - 1)
  const stopoverAirports = segments.map(seg => segsets[seg].destinationCode).slice(0, -1).join(', ')
  const durationText = `${Math.floor(duration / 60)}h ${duration % 60}m`
  const mDate1 = moment(segsets[segments[segments.length - 1]].arriveTimeAirport, 'YYYY/MM/DD')
  const mDate2 = moment(segsets[segments[0]].leaveTimeAirport, 'YYYY/MM/DD')
  const daysDiff = mDate1.diff(mDate2, 'days')

  return (
    <div className='flight-summary'>
      <figure>
        {airlineCodes.map(code => (
          <img key={code} className={imgClass} src={`${host[code]}${url[code]}`} alt={`${code} logo`} />
        ))}
      </figure>
      <div>
        <div>{departTime} - {arriveTime}{!!daysDiff && <sup>+{daysDiff}</sup>}</div>
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