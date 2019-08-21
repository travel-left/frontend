import React, { Component } from 'react'

export default class Image extends Component {
    state = {
        error: this.props.src === 'https://' || !this.props.src
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
        const imageUrl = error ? null : src
        const initials = name ? getInitials(name) : ''
        const renderInitials =
            !imageUrl || error || src === 'https://' ? (
                <h1
                    className="text-light text-center"
                    style={{
                        position: 'absolute',
                        zindex: 2,
                        top: '22.5%',
                        left: '27.5%'
                    }}
                >
                    {initials}
                </h1>
            ) : null

        return (
            <div className="text-center">
                <img
                    src={imageUrl}
                    alt=""
                    className="rounded-circle bg-secondary"
                    style={{
                        // objectFit: 'cover',
                        height: diameter,
                        width: diameter
                    }}
                    onError={this.handleError}
                />
                {renderInitials}
            </div>
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
