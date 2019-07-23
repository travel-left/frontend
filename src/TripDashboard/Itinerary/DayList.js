import React from 'react'
import Day from './Day'

export default ({ days }) => (days.map(day => (<Day day={day} />)))
