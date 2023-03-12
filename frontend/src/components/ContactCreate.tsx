import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { actions, useTypedDispatch, useTypedSelector } from '../redux/redux';
import _ from 'lodash';

interface CreateContactProps {
    open: boolean;
    onClose: () => void;
    onCreate: () => void;
}

const CreateContactDialog = ({ open, onClose, onCreate }: CreateContactProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const dispatch = useTypedDispatch();

    const handleCreate = async () => {
        const contact = {
            name,
            email,
            phone
        };
        dispatch(actions.contact.create(contact));
        if (!_.isNil(onCreate) && _.isFunction(onCreate)) {
            onCreate();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Contact</DialogTitle>
            <DialogContent>
                <TextField
                    autoComplete="given-name"
                    label='Name'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={name}
                    autoFocus
                    id='create-name'
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label='Email'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={email}
                    type='email'
                    id='create-email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label='Phone'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={phone}
                    type='tel'
                    id='create-phone'
                    onChange={(e) => setPhone(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreate} color='primary' variant='contained'>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateContactDialog;
