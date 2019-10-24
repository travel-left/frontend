import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import SendIcon from '@material-ui/icons/Send'
import { Portal } from 'react-portal'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default class CollectMoneyModalForm extends Component {
    state = {
        modalAnimation: '',
        overlayAnimation: '',
        message: '',
        amount: '',
        selectedTravelers: this.props.selectedTravelers
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleTravelerChange = e => {
        let travelersChecked = e.target.value
        this.setState({
            selectedTravelers: this.props.allTravelers.filter(t => travelersChecked.includes(t.name))
        })
    }

    handleSubmit = e => {
        const { selectedTravelers, amount, message } = this.state
        e.preventDefault()
        this.props.submit(
            selectedTravelers, amount, message
        )
        this.handleToggleModal()
    }

    handleToggleModal = async () => {
        if (this.props.isOpen) {
            this.setState({
                modalAnimation: 'zoomOut', overlayAnimation: 'fadeOut', name: '',
                name: '',
                email: '',
                phone: '',
                personalNotes: ''
            },
                () => {
                    setTimeout(() => {
                        this.props.toggleModal()
                    }, 321);
                })
        }
    }

    render() {
        let { allTravelers } = this.props
        let { selectedTravelers } = this.state

        selectedTravelers = selectedTravelers.map(t => t.name)
        allTravelers = allTravelers.map(t => t.name)

        return (
            <Portal >
                <div className="modal d-block" style={{
                    maxHeight: 'calc(100vh - 50px)',
                    overflowY: 'auto'
                }}
                >
                    <div className={`Modal--overlay animated fadeIn ${this.state.overlayAnimation}`} onClick={this.handleToggleModal} />
                    <div className="modal-dialog" role="document">
                        <form className={`modal-content Modal-Form animated zoomIn ${this.state.modalAnimation}`} style={{ backgroundColor: '#FFFFFF' }}>
                            <div className="modal-header Modal-Form-header py-3 d-flex align-items-center">
                                <h5 className="modal-title Modal-Form-header pl-3"> Collect Money from Travelers</h5>
                                <IconButton onClick={this.handleToggleModal} color='primary'>
                                    <CloseIcon style={{ color: 'white' }} fontSize="large" />
                                </IconButton>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-10">
                                        <InputLabel htmlFor="select-multiple-chip">Travelers</InputLabel>
                                        <Select
                                            multiple
                                            value={selectedTravelers}
                                            onChange={this.handleTravelerChange}
                                            input={<Input id="select-multiple-chip" />}
                                            renderValue={selected => (
                                                <div className='d-flex flex-wrap m-2'>
                                                    {selected.map(value => (
                                                        <Chip className='d-flex flex-wrap m-2' color="secondary" style={{ color: 'white' }} key={value} label={value} />
                                                    ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                            style={{ width: '100%' }}
                                        >
                                            {allTravelers.map(name => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-10">
                                        <TextField
                                            required
                                            id="standard-required"
                                            label="Amount"
                                            value={this.state.amount}
                                            placeholder="100.00"
                                            margin="normal"
                                            className="mx-2 mt-4"
                                            onChange={this.handleChange}
                                            name="amount"
                                            style={{ width: '100%' }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-10">
                                        <TextField
                                            id="standard-multiline-static"
                                            label="Message"
                                            value={this.state.message}
                                            multiline
                                            rows="2"
                                            placeholder="The message you want your travelers to see"
                                            className="mx-2 mt-4"
                                            margin="normal"
                                            onChange={this.handleChange}
                                            name="message"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <Button type="submit" className="float-right" size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px' }} onClick={this.handleSubmit}>
                                    Send
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Portal >
        )
    }
}

