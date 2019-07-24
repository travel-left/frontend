import React from 'react'
import Day from './Day'

export default ({ days }) => days.map(day => (<Day key={day} day={day} />))
