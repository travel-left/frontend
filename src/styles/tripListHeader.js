import sizes from './sizes'

export default theme => ({
    tripListHeader: {
        height: theme.spacing(6),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    tripImage: {
        width: theme.spacing(15),
        marginRight: theme.spacing(1)
    },
    tripDate: {
        width: theme.spacing(8),
        margin: theme.spacing(1),
        textAlign: 'center',
        [sizes.down("md")]: {
            display: 'none'
        }
    },
    tripStatus: {
        width: theme.spacing(13),
        textAlign: 'center',
        margin: theme.spacing(1),
        [sizes.down("sm")]: {
            display: 'none'
        },
    },
    tripName: {
        margin: theme.spacing(1),
        width: theme.spacing(22)
    }
})