import React, { useEffect, useState} from 'react';
import {storage, db} from '../shared/firebase';
import {Redirect} from 'react-router-dom';
import './styles/LoginUpload.scss';
import { makeStyles } from '@material-ui/core/styles';
import {LinearProgress, Snackbar } from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
  });

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}





function ImageUpload ({auth,setAuth}) {

    let history = useHistory();

    const classes = useStyles();
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(false);
    const [details, setDetails] = useState(
        { 
            title: "",
            image: "",
            link: "",
            description: "",
            text: "",
            featured: false,
            isNew: false,
            isBanner: false,
        },
    );
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setSubmit(false);
      };

    const handleText = (e) => {
            setDetails({ ...details, [e.target.name]: e.target.value == "true" ? e.target.checked : e.target.value  });
    };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        db.collection("CardData")
          .add({ ...details })
          .then(() => {
            setSubmit(true);
          })
          .catch((error) => {
            setError(true);
          });
          console.log(details);
        resetForm();
      };

    const resetForm = () => {
        setDetails({
            title: "",
            link: "",
            description: "",
            text: "",
            featured: false,
            isNew: false,
            isBanner: false,
        });
        setImage(null);
        setUrl("");
        setProgress(0);
    };

      
    const  handleChange = e => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
        (snapshot) => {
                setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
            
        },
        (error) => {
            console.log(error);
        },
        (complete) => {
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log(url);
                setUrl(url);
                setDetails({...details,link: url, image: url});
                alert("Upload Success");
            })
        });
    }

    const handleLogout = (e) =>{
        e.preventDefault();

        
        setTimeout(function(){
            setAuth(false);
       }.bind(this),1500);
        
    }

    if(!auth){
        return <Redirect to="/login" />
    }
    else
    {
        return (
            <div className="data-form">
                <div className="data-wrapper">
                    <div className="image-upload">
                        <div className={classes.root}>
                            <LinearProgress variant="determinate" value={progress} />
                        </div>
                        <div className="image-upload-container">
                            <div className="image-upload-wrapper">
                                <input className="file-upload" type="file" onChange={handleChange}/>
                                <button className="btn-upload" onClick={handleUpload}>Upload</button>
                            </div>
                            <img className="image-uploaded" src={url} />
                        </div>
                    </div>
                    <div>
                        <form className="card-data-form" onSubmit={handleSubmit} name = "card-data">
                            <input type="hidden" name="form-name" value="data" />
                            <label> Image Title: 
                                <input type="text" name="title" value = {details.title} onChange={handleText}/>
                            </label>
                            <label> Image Description: 
                                <input type="text" name="description" value = {details.description} onChange={handleText}/>
                            </label>
                            <label> Image Url: 
                                <input type="text" name="link" value = {details.link} disabled/>
                            </label>
                            <label> Softwares Used: 
                                <input type="text" name="text" value = {details.text} onChange={handleText}/>
                            </label>
                            <label> New Post?: 
                                <input type="checkbox" name="isNew" value="true" onChange={handleText} checked={details.isNew}/>
                            </label>
                            <label> Featured?: 
                                <input type="checkbox" name="featured" value="true" onChange={handleText} checked={details.featured}/>
                            </label>
                            <label> Publish on Banner?: 
                                <input type="checkbox" name="isBanner" value="true" onChange={handleText} checked={details.isBanner}/>
                            </label>
                            <br/>
                            <button type="submit" >Submit</button>
                            <button type="button" onClick={handleLogout}>Logout</button>
                        </form>
                        <Snackbar
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            open={submit}
                            autoHideDuration={6000}
                            onClose={handleClose}
                        >
                            <Alert onClose={handleClose} severity="success">
                                You have successfully submitted the form
                            </Alert>
                        </Snackbar>
                        <Snackbar
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            open={error}
                            autoHideDuration={6000}
                            onClose={handleClose}
                        >
                        <Alert onClose={handleClose} severity="error">
                            The form could not be submitted. Retry after some time
                        </Alert>
                        </Snackbar>
                    </div>
                </div>
            </div>
        )}
}

export default ImageUpload;