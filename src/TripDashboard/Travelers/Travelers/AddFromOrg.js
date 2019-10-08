import React, { Component } from 'react'
import Select from 'react-select'
import { Portal } from 'react-portal'

export default class AddFromOrg extends Component {
    state = {
        selectedTravelers: [],
        formAnimation: '',
        overlayAnimation: ''
    }

    handleChange = travelers => {
        this.setState(prevState => ({
            selectedTravelers: [
                ...travelers.map(t => t.value)
            ]
        }))
    }

    handleToggleModal = () => {
        if (this.props.isOpen) this.setState({ formAnimation: 'zoomOut', overlayAnimation: 'fadeOut' })
        setTimeout(() => {
            this.props.toggleModal()
        }, 210);

    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state.selectedTravelers)
        this.props.submit(this.state.selectedTravelers)
        this.handleToggleModal()
    }

    render() {
        const customStyles = {
            container: provided => ({
                ...provided
            }),
            select: provided => ({
                ...provided,
                background: 'white',
                height: 'auto'
            }),
            valueContainer: provided => ({
                ...provided,
                minHeight: '50px',
                minWidth: '200px'
            })
        }

        const { travelers } = this.props

        return (
            <Portal >
                <div className="modal d-block" style={{
                    maxHeight: 'calc(100vh - 50px)',
                    overflowY: 'auto'
                }}
                >
                    <div className={`Modal--overlay animated fadeIn ${this.state.overlayAnimation}`} onClick={this.handleToggleModal} />
                    <div className="modal-dialog" role="document">
                        <form className={`modal-content Modal-Form animated zoomIn ${this.state.formAnimation}`} style={{ backgroundColor: '#FFFFFF' }}>
                            <div className="modal-header Modal-Form-header py-3 d-flex align-items-center">
                                <h5 className="modal-title Modal-Form-header pl-3" id="addnewNameModal"> Add travelers to this trip</h5>
                                <button
                                    className='btn btn-link'
                                    type="reset"
                                    aria-label="Close"
                                    style={{ backgroundColor: '0F58D1' }}
                                    onClick={this.handleToggleModal}
                                >
                                    <i class="material-icons" style={{ color: 'white' }}>close</i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Select
                                    isMulti
                                    name="travelers"
                                    options={travelers.map(t => ({
                                        value: t._id,
                                        label: `${t.name}`
                                    }))}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    styles={customStyles}
                                    placeholder="Select..."
                                    onChange={this.handleChange}
                                />
                                <hr className="my-4" />
                                <button className="btn btn-lg btn-primary float-right" onClick={this.handleSubmit}>SUBMIT</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Portal>
        )
    }
}
