import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";

interface FormDialogProps {
  open: boolean;
  handleOpen: (open: boolean) => void;
  handleChange: (name: string) => void;
  handleSubmit: (name: string) => void;
}

const FormDialog: React.FC<FormDialogProps> = (props: FormDialogProps) => {
  const [name, setName] = useState("");

  const handleClose = () => {
    props.handleOpen(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
    props.handleChange(name);
  };

  const handleOnSubmit = () => {
    console.log("handleonSubmit", name);
    props.handleSubmit(name);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        {/* <DialogTitle>New ChatRoom Dialog</DialogTitle> */}
        <DialogContent>
          {/* <DialogContentText>Enter ChatRoom name</DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Chatroom Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOnSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
