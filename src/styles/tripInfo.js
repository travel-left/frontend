export default theme => ({
    tripInfo: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(4)
    },
    tripInfoImage: {
        objectFit: "cover",
        borderRadius: "5px",
        filter: "drop-shadow(0 5px 5px #333)",
        width: "100%",
        marginBottom: theme.spacing(3),
    },
    tripInfoName: {
        display: "flex",
        justifyContent: "start",
        marginBottom: theme.spacing(3),
    },
    tripInfoDescription: {
        marginBottom: theme.spacing(3)
    },
    tripInfoData: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing(3)
    }
})