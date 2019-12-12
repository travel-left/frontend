import React, { Component } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import Card from '@material-ui/core/Card'

export default class Map extends Component {
    state = {
        viewport: {
            width: '100%',
            height: '200px',
            zoom: 11
        },
        allowScrollZoom: false
    }

    handleViewportChange = viewport => this.setState({ viewport })

    render() {
        const { lat, long } = this.props.coordinates
        return (
            <Card style={{ marginBottom: 16 }}>
                <ReactMapGL
                    {...this.state.viewport}
                    latitude={lat}
                    longitude={long}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                    onViewportChange={this.handleViewportChange}
                    scrollZoom={this.state.allowScrollZoom}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    onClick={() => this.setState({ allowScrollZoom: !this.state.allowScrollZoom })}
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
            </Card>

        )
    }
}
