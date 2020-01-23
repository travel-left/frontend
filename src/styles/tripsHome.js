import sizes from './sizes'

export default theme => ({
    tripFilters: {
        [sizes.down("sm")]: {
            display: 'none'
        },
    },
    buttonBox: {
        margin: theme.spacing(2),
        width: '180px',
        height: '50px',
    },
    leftGutter: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    main: {
        margin: theme.spacing(2)
    }
})