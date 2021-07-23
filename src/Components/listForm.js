import { React, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { Container, createTheme, ThemeProvider, Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';


const theme = createTheme({
    typography: {
        h4: {
            fontSize: "2rem",
            fontWeight: 500,

        }
    }
})
export default function ListForm() {


    const [input, setinput] = useState("");
    const [todo, settodo] = useState([]);
    const [checked, setChecked] = useState(false);
    const handleChange = (e) => {
        setinput(e.target.value);
        console.log(input);
    }
    const handleClick = (e) => {
        e.preventDefault();
        settodo([...todo, { id: uuidv4(), title: input, completed: false }]);
        setinput("");
    }
    const handleDelete = (elem) => {
        console.log(elem.id);
        settodo(todo.filter((item) => elem.id !== item.id));
    }
    const handleComplete = (e, elem) => {

        settodo(todo.map((item) => {
            if (elem.id === item.id) {
                setChecked(e.target.checked);
                return { ...item, completed: !item.completed };
            }
            return item;
        }
        ));
    }

    return (

        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container>
                    <Typography
                        variant="h4"
                        fontWeightMedium
                        color="#f48fb1">
                        To Do List
                    </Typography>
                    <form onSubmit={handleClick}>
                        <TextField id="standard-basic"
                            placeholder="Enter to do"
                            type="text"
                            value={input}
                            onChange={handleChange}
                            noValidate
                            autoComplete="off"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="dense"
                            color="secondary"
                        />

                        <Button type="submit" color="secondary">➕</Button>
                    </form>
                    <div>
                        <ul>
                            {todo.map((item) =>
                                <ListItem key={item.id}>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={checked}
                                            inputProps={{ 'aria-label': 'success checkbox' }}
                                            onChange={(e) => handleComplete(e, item)}
                                        />
                                    </ListItemIcon>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) => e.preventDefault()}
                                    />
                                    <div>
                                        {/* <button onClick={() => handleComplete(item)}>✔</button> */}
                                        <Button color="secondary" onClick={() => handleDelete(item)}>❌</Button>
                                    </div>
                                </ListItem>)}

                        </ul>
                    </div>
                </Container>
            </ThemeProvider>
        </>

    )
}
