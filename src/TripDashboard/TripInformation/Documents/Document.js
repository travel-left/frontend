import React, { Component } from 'react'
import { getIcon } from '../../../util/file-icons'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import LeftModal from '../../../util/otherComponents/LeftModal'
import DocumentForm from '../../../Forms/DocumentForm'
import LeftFab from '../../../util/otherComponents/LeftFab'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    resource: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: props => theme.spacing(2, props.tinyDoc ? 0 : 2),
        padding: theme.spacing(2),
        maxWidth: theme.spacing(68),
    },
    nameAndEditContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    descriptionContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    miniResource: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: theme.spacing(.5),
        marginTop: theme.spacing(2)
    },
    icon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.secondary.main,
        borderRadius: theme.spacing(.5)
    },
    iconImage: {
        padding: theme.spacing(2),
        "&:hover": {
            cursor: "pointer",
        }
    },
    openLinkContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.grey["A700"],
        width: '100%'
    },
    link: {
        letterSpacing: 0,
        fontSize: '16px',
        fontFamily: 'Roboto',
        borderBottom: `2px solid ${theme.palette.grey["A700"]}`,
        color: theme.palette.grey["A700"],
        "&:hover": {
            cursor: "pointer",
            color: theme.palette.primary,
        }
    }
})


class Document extends Component {
    state = {
        isEditModalOpen: false
    }

    handleEdit = putObject => {
        this.props.update(this.props._id, putObject)
        this.closeModal()
    }

    handleDelete = () => {
        this.props.remove(this.props._id)
        this.closeModal()
    }

    closeModal = () => (this.setState({ isEditModalOpen: false }))
    openModal = () => (this.setState({ isEditModalOpen: true }))

    render() {
        let { name, description, link, type, classes, tinyDoc, share } = this.props

        const linkImg = getIcon(link)

        return (
            <Grid item xs={12} sm={tinyDoc ? 12 : 8} md={tinyDoc ? 12 : 6} >
                <Card className={classes.resource} id="resource">
                    <div className={classes.nameAndEditContainer}>
                        <Typography variant="subtitle2">{name}</Typography>
                        {!share && !tinyDoc &&
                            <LeftFab
                                id="contact-edit-button"
                                onClick={this.openModal}
                            >
                                Edit
                            </LeftFab>
                        }
                        {
                            this.state.isEditModalOpen && <LeftModal
                                isOpen={this.state.isEditModalOpen}
                                toggleModal={this.closeModal}
                                title='Edit resource'
                                name={name}
                                description={description}
                                submit={this.handleEdit}
                                type={type}
                                link={link}
                                remove={this.handleDelete}
                                form={DocumentForm}
                            />
                        }
                    </div>
                    <div className={classes.descriptionContainer}>
                        <Typography variant="caption">{description}</Typography>
                        {type === 'LINK' && <Typography variant="caption">{link}</Typography>}
                    </div>
                    <Card className={classes.miniResource}>
                        <div className={classes.icon}>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                download>
                                <img
                                    src={linkImg}
                                    alt=""
                                    className={classes.iconImage}
                                    style={{ objectFit: 'cover' }}
                                />
                            </a>
                        </div>
                        <div className={classes.openLinkContainer}>
                            <a
                                className={classes.link}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {type === 'LINK' ? 'Open link' : 'Download'}
                            </a>
                        </div>
                    </Card>
                </Card>
            </Grid>
        )
    }
}

export default withStyles(styles)(Document)
