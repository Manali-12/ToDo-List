import { makeStyles } from '@material-ui/core'
import React from 'react'


const useStyles = makeStyles({
    view: {
        backgroundColor: "#FFE3E3",
        textAlign: "left",
        padding: "2%",
        margin: "4% 4% 0 4%",
        borderRadius: "25px",
    }
})
export default function Layout({ children }) {
    const classes = useStyles();
    return (

        <div className={classes.view}>
            {/* <h3>yuyu</h3> */}
            <div>
                {children}
            </div>
        </div>
    )
}
