import { React, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { createTheme, ThemeProvider, Typography, makeStyles, ListItemText } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';


const theme = createTheme({
    typography: {
        h4: {
            fontSize: "2rem",
            fontWeight: 500,
        },
        body1: {
            fontSize: "20px",
            fontWeight: 480,
        }
    },
    palette: {
        primary: {
            main: "#FFE3E3"
        }
    },
    overrides: {
        MuiInputBase: {
            root: {
                color: "white",
                fontSize: "18px",
                fontWeight: "420px"
            }

        },
    }

});
const useStyles = makeStyles((theme) => {
    return {
        complete: {
            textDecoration: "lineThrough"
        },
        todo_area: {
            border: "2px",
            borderRadius: "25px",
            maxWidth: "60%",
            margin: "auto"

        },
        f_area: {
            backgroundColor: "#262A53",
            maxWidth: "100%",
            margin: "3% auto 0 auto",
            padding: "3% 5%",
            borderRadius: "25px 25px 0 0",
            zIndex: 1,
        },
        i_field: {
            width: "87%",

        },
        t_list: {
            backgroundColor: "#FFA0A0",
            maxWidth: "100%",
            margin: "0 auto 5% auto",
            padding: "2% 2% 0 2%",
            wordWrap: "break-word",
            borderRadius: "0 0 25px 25px",
            zIndex: -1,
        },
        but_style: {
            margin: "2%"
        },
        l_item: {
            flexGrow: 1,
            color: "#262A53",
        },

    };
})
export default function ListForm() {

    const [input, setinput] = useState("");
    const [todo, settodo] = useState([]);
    const classes = useStyles(todo);
    console.log(todo);


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
    }


    return (


        <div className={classes.todo_area}>
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="dense"
                                color="primary"
                                fullWidth filled="true"
                                className={classes.i_field}
                            />
                            <Button type="submit" color="primary" variant="outlined" className={classes.but_style}>ADD</Button>
                        </form>
                    </div>
                    <div className={classes.t_list}>
                        <ul style={{ margin: 0 }}>
                            {todo.map((item) =>
                                <ListItem key={item.id}>
                                    <ListItemText
                                        primary={item.title}
                                        className={classes.l_item}
                                    />
                                    <div>
                                        <Button className={classes.test} onClick={() => handleComplete(item)}>{item.completed ? "✔✔" : "✔"}</Button>
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
