import React, { Component } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

export default class Map extends Component {
    state = {
        viewport: {
            width: '100%',
            height: '200px',
            zoom: 11
        }
    }

    handleViewportChange = viewport => this.setState({ viewport })

    render() {
        const { lat, long } = this.props.coordinates
        return (
            <ReactMapGL
                {...this.state.viewport}
                latitude={lat}
                longitude={long}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={this.handleViewportChange}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker
                    latitude={lat}
                    longitude={long}
                    offsetLeft={-10}
                    offsetTop={-30}
                >
                    <i className="fas fa-map-marker fa-2x" />
                </Marker>
            </ReactMapGL>
        )
    }
}
