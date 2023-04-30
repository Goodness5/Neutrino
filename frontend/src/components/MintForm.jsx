import {React, useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const MintForm = (props) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [propertyDescription, setPropertyDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setlocation] = useState('');

  
    const handleProceed = () => {
        props.proceed(true);
      };
    const handleClose = () => {
        props.cancelMint(false);
      };
  
    return (
    <div>
        <Dialog open={props.openMint} onClose={handleClose}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Specify the nature of the task, be as detailed as possible. Payment won't be made until offer is accepted
          </DialogContentText>
          <TextField autoFocus margin="dense" label="Title" type="text" fullWidth inputProps={{ maxLength: 30 }} value={title} onChange={(e) =>setTitle(e.target.value)}/>
          <TextField autoFocus margin="dense" label="Description" type="text" fullWidth  value={propertyDescription} rows={4} multiline  onChange={(e) =>setPropertyDescription(e.target.value)}/>
          <TextField autoFocus margin="dense" label="Price" type="text" fullWidth  value={price} onChange={(e) =>setPrice(e.target.value)}/>
          <TextField autoFocus margin="dense" label="Location" type="text" fullWidth  value={location} onChange={(e) =>setlocation(e.target.value)}/>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleProceed}>Proceed</Button>
      </DialogActions>
      </Dialog>
    </div>
  )
}

export default MintForm