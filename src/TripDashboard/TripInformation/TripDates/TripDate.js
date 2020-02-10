import React, { Component } from 'react'
import moment from 'moment'
import IconButton from '@material-ui/core/IconButton'
import LeftModal from '../../../util/otherComponents/LeftModal'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Typography from '@material-ui/core/Typography'
import TripDateForm from '../../../Forms/TripDateForm'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    tripDate: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(2, 2, 0, 2),
        width: "100%"
    },
    icon: {
        color: "#FFFFFF",
        height: theme.spacing(8),
        width: theme.spacing(8),
        borderRadius: theme.spacing(.5),
        backgroundColor: props => getColor(props.type),
        height: theme.spacing(7),
        width: theme.spacing(7),
        fontSize: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        marginLeft: theme.spacing(2)
    },
    editButton: {
        color: theme.palette.grey["A700"]
    }
})

const getColor = tripDateType => {
    let backgroundColor
    switch (tripDateType) {
        case 'TRAVEL':
            backgroundColor = "#29CB97"
            break
        case 'PAPERWORK':
            backgroundColor = "#FEC400"
            break
        case 'MONEY':
            backgroundColor = "#B558F6"
            break
        case 'OTHER':
            backgroundColor = "#FFABAA"
            break
        default:
            backgroundColor = "#FFABAA"
            break
    }

    return backgroundColor
}

class TripDate extends Component {

    state = {
        showModal: false
    }

    handleUpdate = putObject => {
        this.props.update(this.props._id, putObject)
    }

    handleDelete = () => {
        this.props.remove(this.props._id)
        this.closeModal()
    }

    toggleModal = () => this.setState({ showModal: !this.state.showModal })

    render() {
        const { name, date, type, share, classes } = this.props
        const { showModal } = this.state
        let iconString

        switch (type) {
            case 'TRAVEL':
                iconString = "card_travel"
                break
            case 'PAPERWORK':
                iconString = "folder_open"
                break
            case 'MONEY':
                iconString = "attach_money"
                break
            case 'OTHER':
                iconString = "calendar_today"
                break
            default:
                iconString = "calendar_today"
                break
        }

        const dateWithoutTimeorTZ = date.split('T')[0]

        return (
            <>
                <div className={classes.tripDate}>
                    <div className={classes.container}>
                        <i className={`${classes.icon} material-icons`}>{iconString}</i>
                        <div className={classes.content}>
                            <Typography variant="subtitle2">
                                {name}
                            </Typography>
                            <Typography variant="caption">
                                {moment(dateWithoutTimeorTZ).format('MMMM DD')}
                            </Typography>
                        </div>
                    </div>
                    {!share &&
                        <IconButton className={classes.editButton} onClick={this.toggleModal} id="edit-trip-date-button">
                            <MoreHorizIcon />
                        </IconButton>
                    }
                </div>
                <>
                    {
                        showModal && <LeftModal
                            closeModal={this.toggleModal}
                            title='Update important date'
                            submit={this.handleUpdate}
                            remove={this.handleDelete}
                            date={moment(date).format('MM-DD-YYYY')}
                            category={type}
                            name={name}
                            form={TripDateForm}
                        />
                    }
                </>
            </>
        )
    }
}

export default withStyles(styles)(TripDate)