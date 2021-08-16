import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Snackbar } from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";
import './styles/LoginUpload.scss';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function Login({setAuth}) {
    let history = useHistory();


    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState({
        err: false,
        message: "",
    });

    const [login, setLogin] = useState({
        user: "",
        password:  "",
    })

    const cred = {
        username: "rextitanium",
        email: "s4samyak@gmail.com",
        password: "zephyrus",
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setSubmit(false);
        setError({...error, err:false});
      };


    const handleChange = e => {
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(login.user === cred.username || login.user === cred.email) {
            if(login.password == cred.password) {
                setError({...error, err: false});
                setSubmit(true);
                
                setTimeout(function(){
                    setAuth(true);
                    history.push("/upload");
               }.bind(this),3000);

            }
            else setError({...error, err: true, message:"Wrong Password"});
        }
        else setError({...error, err: true, message:"Wrong Username or Email"});
    }

    return (
        <div className="login">
            <form className="login-form" onSubmit={handleSubmit} method="post">
                <label>
                    Login Id:
                    <input type="text" name="user" value={login.user} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Password
                    <input type="password" name="password" value={login.password} onChange={handleChange}/>
                </label>
                <br/>
                <button type="submit" className="btn-submit">Submit</button>
            </form>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={submit}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Logged in successfully
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={error.err}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Login
