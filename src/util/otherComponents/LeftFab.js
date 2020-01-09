import React from 'react'
import Chip from '@material-ui/core/Chip'
import Fab from '@material-ui/core/Fab'

const LeftFab = ({ label, fab, onClick, backgroundColor }) => {
    const styles = {
        fontWeight: '500',
        fontFamily: 'roboto',
        fontSize: 16,
        color: '#FFFFFF',
        backgroundColor: '#475561',
        minWidth: 88,
        height: 32,
        textTransform: 'none',
    }
    return fab ? <Fab variant="extended" onClick={onClick}
        style={styles}>{label}</Fab> :
        <Chip
            style={{
                ...styles,
                paddingLeft: 4,
                paddingRight: 4
            }
            }
            label={label}
        />
}

export default LeftFab

