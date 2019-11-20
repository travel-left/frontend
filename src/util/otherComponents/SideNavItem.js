import React from 'react'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Card from '@material-ui/core/Card';

export default ({ text, total, active, handleClick, divider }) => {
    return (
        <Card>
            {divider && <Divider />}
            <ListItem button className='d-flex justify-content-between align-items-center' onClick={() => handleClick(text)} name={text} style={{ background: active && '#0A58CE', padding: '12px 16px' }}>
                {/* <ListItemText primary="Trash" /> */}
                <Typography variant="h6" style={{ color: active ? 'white' : '#666666' }}>{text}</Typography>
                <Chip color="primary" size="small" label={total} style={{ fontSize: 12, fontWeight: 600, }} />
            </ListItem>
        </Card>
    )
}

{/* <ListItem className='d-flex justify-content-between align-items-center' onClick={handleClick} name={text} style={{ background: active ? '#0A58CE' : 'white', padding: '8px 16px' }}>
    <Divider />
    <Typography variant="h6" style={{ color: active ? 'white' : '#666666' }}>{text}</Typography>
    <Chip color="primary" size="small" label={total} style={{ fontSize: 12, fontWeight: 600, }} />
</ListItem> */}