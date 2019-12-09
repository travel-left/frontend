import React from 'react'
import Fab from '@material-ui/core/Fab'


export default ({ submit }) => {

    return (
        <div>
            <p style={{
                fontFamily: 'Roboto',
                fontSize: '18px',
                color: '#666666',
                lineHeight: '24px',
                paddingTop: '10px',
                paddingBottom: '15px'
            }}>In order to collect payments, you need to register your account. The process takes about 15 minutes. <br></br>Click the button below when you're ready to register.</p>
            <div className="d-flex justify-content-center align-items-center mb-4">
                <Fab variant="extended" aria-label="delete" className="linky-boi-button" type="submit" onClick={submit}>I'm ready to register my account!</Fab>
            </div>
        </div>
    )
}
