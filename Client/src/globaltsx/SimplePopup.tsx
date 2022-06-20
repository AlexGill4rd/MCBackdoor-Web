import React, { useState } from "react";

import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props:any, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SimplePopup(props: {Title: string, Description: string, Severity: string;}) {
  const [modelIsOpen, setModalIsOpen] = useState(true);


  function handleClose(reason:any){
    if (reason === 'clickaway') {
      return;
    }
    setModalIsOpen(false);
  }
  return (
    <Snackbar open={modelIsOpen} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={props.Severity} sx={{ width: '100%' }}>
        <AlertTitle>{props.Title}</AlertTitle>
        {props.Description}
      </Alert>
    </Snackbar>
  );
}

export default SimplePopup;