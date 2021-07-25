import { React, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { Container, createTheme, ThemeProvider, Typography, makeStyles, ListItemText } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';


const theme = createTheme({
    typography: {
        h4: {
            fontSize: "2rem",
            fontWeight: 500,
        }
    },
    palette: {
        primary: {
            main: "#FFE3E3"
        }
    },


});
const useStyles = makeStyles({
    complete: {
        textDecoration: "lineThrough"
    },
    f_area: {
        backgroundColor: "#262A53",
        maxWidth: "60%",
        margin: "3% auto 0 auto",
        padding: "2%",
        borderRadius: "25px 25px 0 0 "
    },
    i_field: {
        width: "80%",
        color: "white",

    },
    t_list: {
        backgroundColor: "#FFA0A0",
        maxWidth: "60%",
        margin: "1% auto 5% auto",
        padding: "0 2% 0 2%",
        wordWrap: "break-word",

    },
    but_style: {
        margin: "2%"
    }
})
export default function ListForm() {

    const [input, setinput] = useState("");
    const [todo, settodo] = useState([]);
    const classes = useStyles();

    const handleChange = (e) => {
        setinput(e.target.value);
        console.log(input);
    }
    const handleClick = (e) => {
        e.preventDefault();

        if (input !== "")
            settodo([...todo, { id: uuidv4(), title: input, completed: false }]);

        setinput("");
    }
    const handleDelete = (elem) => {
        console.log(elem.id);
        settodo(todo.filter((item) => elem.id !== item.id));
    }
    const handleComplete = (elem) => {
        settodo(todo.map((item) => {
            if (elem.id === item.id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        }
        ));
        if (elem.completed)
            document.getElementsByClassName(".textInput").classlist.add("classes.complete");
    }

    return (


        <div >
            <ThemeProvider theme={theme}>
                <div >
                    <div className={classes.f_area}>
                        <Typography
                            variant="h4"
                            color="primary">
                            To Do List
                        </Typography>
                        <form noValidate
                            autoComplete="off"
                            onSubmit={handleClick}>
                            <TextField
                                placeholder="Enter to do"
                                type="text"
                                variant="filled"
                                value={input}
                                onChange={handleChange}
                                style={{ color: "white" }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="dense"
                                color="primary"
                                fullWidth filled
                                className={classes.i_field}
                            />
                            <Button type="submit" color="primary" variant="outlined" className={classes.but_style}>ADD</Button>
                        </form>
                    </div>
                    <div className={classes.t_list}>
                        <ul>
                            {todo.map((item) =>
                                <ListItem key={item.id}>
                                    <ListItemText
                                        primary={item.title}
                                    />
                                    <div>
                                        <Button onClick={() => handleComplete(item)}>✔</Button>
                                        <Button color="secondary" onClick={() => handleDelete(item)}>❌</Button>
                                    </div>
                                </ListItem>)}
                        </ul>
                    </div>
                </div>
            </ThemeProvider>
        </div>

    )
}
