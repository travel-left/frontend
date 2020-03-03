import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import sizes from '../../styles/sizes'

const styles = theme => ({
    modalHeader: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Roboto',
        fontWeight: 500,
    },
    modalContent: {
        position: 'relative',
        borderRadius: theme.spacing(1),
        minWidth: theme.spacing(62),
        maxWidth: theme.spacing(62),
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        [sizes.down('sm')]: {
            minWidth: theme.spacing(30),
        }
    },
    modalBody: {
        padding: theme.spacing(2),
    },
    modalTitle: {
        color: theme.palette.common.white,
        fontSize: '22px',
        letterSpacing: 0
    },
    closeButton: {
        padding: theme.spacing(1, 0)
    }
})

class LeftModal extends Component {

    handleSubmit = async formData => {
        await this.props.submit(formData)
        this.props.closeModal()
    }

    render() {
        const Form = this.props.form ? this.props.form : null
        const { classes, closeModal, title } = this.props

        return (
            <Dialog open onClose={closeModal}>
                <div className={classes.modalContent}>
                    <div className={classes.modalHeader}>
                        <span className={classes.modalTitle}>{title}</span>
                        <IconButton onClick={closeModal} color='primary' className={classes.closeButton} id="modal-close-button">
                            <CloseIcon style={{ color: 'white' }} fontSize="large" />
                        </IconButton>
                    </div>
                    <div className={classes.modalBody}>
                        <Form  {...this.props} submit={this.handleSubmit} />
                    </div>
                </div>
            </Dialog>
        )
    }
}

export default withStyles(styles)(LeftModal)