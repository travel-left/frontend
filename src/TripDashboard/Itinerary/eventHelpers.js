import moment from 'moment-timezone'

function formatEventForBackend(event) {
    event.start = formatDateTime(event.date, event.start)
    event.end = formatDateTime(event.date, event.end)
    event.type = event.type.toUpperCase()
    event.documents = event.selectedDocuments
    event.links = event.links.length ? event.links.split(' ').map(link => link) : []
    event.airline = event.airline ? event.airline.value : ''

    delete event.selectedDocuments
    delete event.date
    return event
}

//takes the UTC date and converts it to the user's timezone
function formatDateToLocalTimezone(date) {
    let localTimezone = moment.tz.guess(true)
    date = moment(date).tz(localTimezone)
    return date
}

function formatDateTime(date, dateTime) {
    let minutes = moment(dateTime).minutes()
    if (minutes.toString().length === 1) {
        minutes = `0${minutes}`
    }
    let hours = moment(dateTime).hours()
    if (hours.toString().length === 1) {
        hours = `0${hours}`
    }

    return {
        date: moment(date).format("YYYY-MM-DD"),
        hours: hours,
        minutes: minutes
    }
}

export { formatEventForBackend, formatDateToLocalTimezone, formatDateTime }