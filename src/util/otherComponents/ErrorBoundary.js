import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="container">
                    <h1>Something went wrong.</h1>
                    <a href="https://app.travel-left.com/">Click here to go back.</a>
                </div>)
        }
        return this.props.children;
    }
}