import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { UserObject } from './UserObject';

interface DeleteUserDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string; // Forwarded user ID
  handleSetUsers: Dispatch<SetStateAction<UserObject[]>>;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ open, onClose, userId, handleSetUsers }) => {

  const fetchUsers = async () => {
    const fetchedUser = await fetch("http://localhost:5000/users");
    const user = await fetchedUser.json();
    handleSetUsers(user);
  };
    
  const handleDelete = (userId: string) => {
    fetch("http://localhost:5000/users/" + userId, {
      method: "DELETE",
    }).then(() => {
      onClose();
      fetchUsers();
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleDelete(userId)} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;