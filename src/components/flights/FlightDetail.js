import React from 'react'
import moment from 'moment'

const FlightDetail = ({ flights, airportDetails, legSegments }) => (
  flights.map((flight, i) => {
    const mDepartTime = moment(flight.leaveTimeAirport, 'YYYY/MM/DD HH:mm')
    const mArriveTime = moment(flight.arriveTimeAirport, 'YYYY/MM/DD HH:mm')
    const destination = `${airportDetails[flight.destinationCode].city} (${flight.destinationCode})`
    const flightRoute = `${airportDetails[flight.originCode].city} (${ flight.originCode }) - ${destination}`
    const flightCode = `${flight.airlineCode} ${flight.flightNumber}`
    const flightDuration = `${Math.floor(flight.duration / 60)}h ${flight.duration % 60}m`
    const stopoverDuration = legSegments[i].laydur ? `${Math.floor(legSegments[i].laydur / 60)}h ${legSegments[i].laydur % 60}m` : null
    return (
      <div className='flight-panel' key={flight.arriveTime}>
        <div className='panel-date'>
          {mDepartTime.format('ddd, DD MMM')}
        </div>
        <div className='panel-main'>
          <div className='panel-top'>
            <div>
              <div className='bold'>{mDepartTime.format('HH:mm')} - {mArriveTime.format('HH:mm')}</div>
              <div>{flightRoute}</div>
              <div className='airplane-detail'>{flightCode} • {flight.equipmentType}</div>
            </div>
            <div>
              <span className='seat-type'>{flight.cabin}</span>
              <span className='bold'>{flightDuration}</span>
            </div>
          </div>
          <div>
            {stopoverDuration && <div className='panel-stopover'>
                  Change plane in {destination} <span className='bold'>{stopoverDuration}</span>
            </div>}
          </div>
        </div>
      </div>
    )
  })
)

export default FlightDetail