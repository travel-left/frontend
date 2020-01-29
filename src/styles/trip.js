import sizes from './sizes'

export default theme => ({
    tripCard: {
        height: theme.spacing(12),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        "&:hover": {
            cursor: 'pointer'
        },
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingRight: theme.spacing(2)
    },
    tripImage: {
        width: theme.spacing(15),
        borderRadius: theme.spacing(.5),
        objectFit: "cover",
        height: theme.spacing(12),
        marginRight: theme.spacing(1)
    },
    tripDate: {
        width: theme.spacing(8),
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(1),
        [sizes.down("md")]: {
            display: 'none'
        }
    },
    tripStatus: {
        width: theme.spacing(13),
        margin: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        [sizes.down("sm")]: {
            display: 'none'
        },
    },
    tripName: {
        display: 'flex',
        justifyContent: 'start',
        margin: theme.spacing(1),
        width: theme.spacing(22)
    }
})