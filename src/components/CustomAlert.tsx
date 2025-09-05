import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

const CustomAlert: React.FC<any> = ({title, message, defaultMessage, open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message || defaultMessage}</DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlert;