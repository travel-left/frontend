import React from 'react'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: props => props.active && theme.palette.primary.main,
        padding: theme.spacing(2, 2),
        "&:hover": {
            backgroundColor: props => props.active && theme.palette.primary.main
        }
    },
    text: {
        color: props => props.active ? 'white' : '#666666'
    },
    chip: {
        fontSize: 12,
        fontWeight: 600
    }
})

export default withStyles(styles)(({ text, total, active, handleClick, divider, classes }) => {
    return (
        <Card>
            {divider && <Divider />}
            <ListItem
                button
                className={classes.listItem}
                onClick={() => handleClick(text)}
                name={text}
            >
                <Typography
                    variant="h6"
                    className={classes.text}
                >
                    {text}
                </Typography>
                {(total == 0 || total) &&
                    <Chip
                        color="primary"
                        size="small"
                        label={total}
                        className={classes.chip}
                    />}
            </ListItem>
        </Card>
    )
})