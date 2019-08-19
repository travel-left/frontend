import React, { Component } from 'react'

export default class Image extends Component {
    DEFAULT_IMAGE =
        'https://cdn.shopify.com/s/files/1/0882/1686/products/lastolite-grey-vinyl-background-275x6m-018_a36fc2d2-5860-48f1-8ec7-4b0ed98e2cf4.jpg?v=1490271176'

    state = {
        error: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.src !== prevProps.src && prevState.error) {
            this.setState({ error: false })
        }
    }

    handleError = e => {
        e.preventDefault()
        if (this.props.onError) {
            this.props.onError({
                message: 'Invalid image link'
            })
        }
        this.setState({
            error: true
        })
    }

    render() {
        const { src, diameter, name } = this.props
        const { error } = this.state
        const imageUrl = error ? '' : src
        const initials = name ? getInitials(name) : ''

        return (

            <img
                src={imageUrl}
                alt=""
                className="rounded-circle bg-secondary"
                style={{
                    objectFit: 'cover',
                    height: diameter,
                    width: diameter
                }}
                onError={this.handleError}
            />
        )
    }
}

const getInitials = name => {
    const nameArray = name.split(' ')
    if (nameArray.length > 2) {
        return name.charAt(0)
    }
    return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0)
}
