import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Coordinator from './Coordinator'
import Typography from '@material-ui/core/Typography'
import { apiCall } from '../../../util/api'
import LeftModal from '../../../util/otherComponents/LeftModal'
import LeftItem from '../../../util/otherComponents/LeftItem'
import AddCoordinatorToTripForm from '../../../Forms/AddCoordinatorToTripForm'

export default class Coordinators extends Component {

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
        const newCoordinatorButton =
            <LeftItem height={100}>
                <Fab onClick={this.openModal} color="secondary" variant="extended" style={{ width: 96, height: 32, fontSize: 12, fontWeight: 600, color: 'white' }}>
                    Add New
                    </Fab>
            </LeftItem>

        const coordinatorList = this.state.coordinators.map(c =>
            <Coordinator
                _id={c._id}
                name={c.name}
                email={c.email}
                image={c.image}
                phone={c.phone}
                title={c.title}
                currentUserId={this.props.currentUser && this.props.currentUser._id}
                remove={this.deleteCoordinator}
                share={this.props.share}
            />
        )

        !this.props.share && coordinatorList.splice(1, 0, newCoordinatorButton)

        return (
            <div style={{ marginTop: 64 }}>
                <Typography variant="h2" style={{ marginBottom: 16 }}> Trip Coordinators </Typography>
                <Grid container>
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
