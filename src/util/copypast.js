try {
    this.setState({
        snack: {
            show: true,
            variant: 'success',
            message: 'Success!'
        }
    })
} catch (err) {
    this.setState({
        snack: {
            show: true,
            variant: 'error',
            message: 'An error occurred.'
        }
    })
}