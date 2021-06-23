import React from "react";
import "./styles/Loading.scss";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
function Loading() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="loading-container">
      {/*<div className="loading"></div>
      <h1>LOADING</h1>*/}
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Loading;
