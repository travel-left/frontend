import React from 'react'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem'
import Card from '@material-ui/core/Card';

export default ({ text, total, active, handleClick, divider }) => {
    return (
        <Card>
            {divider && <Divider />}
            <ListItem button className='d-flex justify-content-between align-items-center' onClick={() => handleClick(text)} name={text} style={{ background: active && '#0A58CE', padding: '12px 16px' }}>
                <Typography variant="h6" style={{ color: active ? 'white' : '#666666' }}>{text}</Typography>
                {(total == 0 || total) && <Chip color="primary" size="small" label={total} style={{ fontSize: 12, fontWeight: 600, }} />}
            </ListItem>
        </Card>
    )
}