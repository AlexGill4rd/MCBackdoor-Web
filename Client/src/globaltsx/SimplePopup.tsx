import React, { useState } from "react";

import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import IPopup from "../interfaces/IPopup";

const Alert = React.forwardRef(function Alert(props: any, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SimplePopup(props: { popup: IPopup }) {
  const [modelIsOpen, setModalIsOpen] = useState(true);

  function handleClose(reason: any) {
    if (reason === "clickaway") {
      return;
    }
    setModalIsOpen(false);
  }
  return (
    <Snackbar open={modelIsOpen} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={props.popup.severity}
        sx={{ width: "100%" }}
      >
        <AlertTitle>{props.popup.title}</AlertTitle>
        {props.popup.message}
      </Alert>
    </Snackbar>
  );
}

export default SimplePopup;
