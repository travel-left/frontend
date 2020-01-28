import React, { Component } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './Auth.css'
import Snack from '../util/otherComponents/Snack'
import { withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

const styles = theme => ({
    card: {
        padding: theme.spacing(2),
        minHeight: theme.spacing(40),
        width: theme.spacing(50),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})

class Auth extends Component {
    state = {
        snack: {
            show: false,
            variant: '',
            message: ''
        }
    }
    closeSnack = () => (this.setState({ snack: { show: false } }))

    login = async state => {
        const { onAuth, history } = this.props

        try {
            await onAuth('signin', state, history)
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

    signUp = async coordinator => {
        const { onAuth, history } = this.props

        try {
            await onAuth('signup', coordinator, history)
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

    handleSwitch = goto => {
        console.log(goto)
        return this.props.history.push(goto)
    }

    render() {
        const { type, classes } = this.props
        const form = type === 'sign in' ?
            <SignIn submit={this.login} handleSwitch={this.handleSwitch} /> :
            <SignUp submit={this.signUp} handleSwitch={this.handleSwitch} />

        return (
            <Grid container>
                <Grid item xs={12} className='content' style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 78px)',
                }}>
                    <Card className={classes.card}>
                        {form}
                    </Card>
                </Grid>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </Grid>
        )
    }
}

export default withStyles(styles)(Auth)