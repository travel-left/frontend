import React from 'react'

const ErrorPage = props => {
    return (
        <div>
            <h3>
                Could not find <code>{props.location.pathname} </code>:(
            </h3>
        </div>
    )
}

export default ErrorPage
