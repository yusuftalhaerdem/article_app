import { Button, IconButton, Slide, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeMessage,
  selectAlertId,
  selectAlertMessage,
  selectAlertStatus,
  selectAlertTimeout,
  selectAlertType,
} from "../features/alertSlice";

export default function AlertBar() {
  const dispatch = useDispatch();
  const message = useSelector(selectAlertMessage);
  const alertTimeout = useSelector(selectAlertTimeout);
  const alertId = useSelector(selectAlertId);

  // it want to try mui library for this rather than my own code since i will be using them quite often.

  const [open, setOpen] = useState(false);

  const closeTheAlert = () => {
    setOpen(false);
    //dispatch(removeMessage);
  };

  const action = () => {
    return (
      <React.Fragment>
        <Button size="small" onClick={closeTheAlert}>
          Dismiss
        </Button>
      </React.Fragment>
    );
  };

  useEffect(() => {
    if (alertId !== 0) setOpen(true);
  }, [alertId]);

  // onClick={() => setOpen(false)}
  return (
    <>
      <Snackbar
        open={open}
        message={message}
        autoHideDuration={alertTimeout}
        action={action()}
        TransitionComponent={Slide}
        onClose={closeTheAlert}
      />
    </>
  );
}

/*
  const message_elements = messages.map((current, index, array) => {
    //const load = {}
    console.log("aa");
    return (
      <Snackbar
        open={open}
        message={current.text}
        autoHideDuration={alertTimeout}
        action={action}
      />
    );
  });

  return <div className="alert-messages">{message_elements}</div>;

//   return <div className="alert-messages">{message_elements}</div>;
/*
        key={current.id}
        id={`alert-message-${current.id}`}
        className="alert-message"
        onClick={removeTheMessage(current.id)}
        */
/*
  const removeTheMessage = (id) => {
    setTimeout(() => {
      const element = document.getElementById(`alert-message-${id}`);
      console.log(element);
      element.classList.add("show");

      setTimeout(() => {
        const element = document.getElementById(`alert-message-${id}`);
        if (element) {
          element.classList.remove("show");

          setTimeout(() => {
            const element = document.getElementById(`alert-message-${id}`);
            if (element) dispatch(removeMessage(id));
          }, 100);
        }
      }, alertTimeout * 30);
    }, 100);
    return (e) => {
      dispatch(removeMessage(id));
    };
  };*/
