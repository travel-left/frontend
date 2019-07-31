import React, { Component } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

export default class Map extends Component {
    state = {
        viewport: {
            width: '100%',
            height: '200px',
            latitude: this.props.coordinates.lat,
            longitude: this.props.coordinates.long,
            zoom: 11
        }
    }

    render() {
        const { coordinates } = this.props
        return (
            <ReactMapGL
                {...this.state.viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={viewport => this.setState({ viewport })}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker
                    latitude={coordinates.lat}
                    longitude={coordinates.long}
                    offsetLeft={-10}
                    offsetTop={-30}
                >
                    <i className="fas fa-map-marker fa-2x" />
                </Marker>
            </ReactMapGL>
        )
    }
}
