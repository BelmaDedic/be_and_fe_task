import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { UserObject } from './dataTypes/UserObject';
import { deleteUser, getAllUsers } from './services/UserService';

interface DeleteUserDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  handleSetUsers: Dispatch<SetStateAction<UserObject[]>>;
}

// Dialog for delete user
const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  open,
  onClose,
  userId,
  handleSetUsers,
}) => {
  const fetchUsers = async (): Promise<void> => {
    const user: UserObject[] = await getAllUsers();
    handleSetUsers(user);
  };

  const handleDelete = async (userId: string): Promise<void> => {
    await deleteUser(userId);
    onClose();
    fetchUsers();
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
