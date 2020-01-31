import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Coordinator from './Coordinator'
import Typography from '@material-ui/core/Typography'
import { apiCall } from '../../../util/api'
import LeftModal from '../../../util/otherComponents/LeftModal'
import LeftItem from '../../../util/otherComponents/LeftItem'
import AddCoordinatorToTripForm from '../../../Forms/AddCoordinatorToTripForm'
import LeftFab from '../../../util/otherComponents/LeftFab'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    coordinatorsSection: {
        marginTop: theme.spacing(4)
    },
    coordinatorList: {
        marginTop: theme.spacing(2)
    }
})

class Coordinators extends Component {

    TRIP_ID = this.props.tripId

    state = {
        coordinators: [],
        coordinatorsFromOrg: [],
        isNewCoordinatorModalOpen: false,
        snack: {
            show: false,
            variant: '',
            message: ''
        },
    }

    constructor(props) {
        super(props)

        this.getCoordinators()
        !this.props.share && this.getCoordinatorsFromOrg()
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))
    closeModal = () => this.setState({ isNewCoordinatorModalOpen: false })
    openModal = () => this.setState({ isNewCoordinatorModalOpen: true })

    getCoordinators = async () => {
        let coordinators = await apiCall(
            'get',
            `/api/trips/${this.TRIP_ID}/coordinators`
        )
        this.setState({ coordinators })
    }

    getCoordinatorsFromOrg = async () => {
        let coordinatorsFromOrg = await apiCall('get', `/api/organization/${this.props.currentUser.organization}/coordinators`)
        this.setState({ coordinatorsFromOrg })
    }

    updateCoordinator = async (coordinatorId, updateObject) => {
        try {
            await apiCall('put', `/api/coordinators/${coordinatorId}`, updateObject
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })

            this.getCoordinators()

        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
    }

    createCoordinator = async data => {
        if (data.fromOrg) {
            try {
                await apiCall(
                    'post',
                    `/api/trips/${this.TRIP_ID}/coordinators/add`,
                    data.coordinatorsToAdd.map(c => c._id)
                )
                this.setState({
                    snack: {
                        show: true,
                        variant: 'success',
                        message: 'Success!'
                    }
                })

                this.getCoordinators()
            } catch (err) {
                this.setState({
                    snack: {
                        show: true,
                        variant: 'error',
                        message: 'An error occurred.'
                    }
                })
            }
        } else {
            let coordinator = data
            try {
                coordinator.organization = this.props.currentUser.organization
                await apiCall(
                    'post',
                    `/api/trips/${this.TRIP_ID}/coordinators`,
                    coordinator
                )
                this.setState({
                    snack: {
                        show: true,
                        variant: 'success',
                        message: 'Success!'
                    }
                })

                this.getCoordinators()

            } catch (err) {
                this.setState({
                    snack: {
                        show: true,
                        variant: 'error',
                        message: 'An error occurred.'
                    }
                })
            }
        }
    }

    deleteCoordinator = async coordinatorId => {
        try {
            await apiCall(
                'delete',
                `/api/trips/${this.TRIP_ID}/coordinators/${coordinatorId}`, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })

            this.getCoordinators()
            this.getCoordinatorsFromOrg()
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
    }

    render() {
        const { classes, share, currentUser } = this.props
        const { coordinators } = this.state

        const newCoordinatorButton =
            <LeftItem >
                <LeftFab id="add-new-coordinator-button" onClick={this.openModal} color="secondary" fab>
                    Add New
                </LeftFab>
            </LeftItem>

        const coordinatorList = coordinators.map(c =>
            <Coordinator
                _id={c._id}
                name={c.name}
                email={c.email}
                image={c.image}
                phone={c.phone}
                title={c.title}
                currentUserId={this.props.currentUser && currentUser._id}
                remove={this.deleteCoordinator}
                share={this.props.share}
            />
        )

        !share && coordinatorList.splice(1, 0, newCoordinatorButton)

        return (
            <div className={classes.coordinatorsSection}>
                <Typography variant="h2"> Coordinators </Typography>
                <Grid container className={classes.coordinatorList}>
                    {coordinatorList}
                    {
                        this.state.isNewCoordinatorModalOpen && <LeftModal
                            isOpen={this.state.isNewCoordinatorModalOpen}
                            toggleModal={this.closeModal}
                            title='Add a coordinator to this trip'
                            coordinators={this.state.coordinators}
                            coordinatorsFromOrg={this.state.coordinatorsFromOrg.filter(c => !this.state.coordinators.map(d => d._id).includes(c._id))}
                            submit={this.createCoordinator}
                            form={AddCoordinatorToTripForm}
                        />
                    }
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Coordinators)