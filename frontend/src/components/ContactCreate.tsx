import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { actions, useTypedDispatch, useTypedSelector } from '../redux/redux';
import { Contact } from '../redux/contact';
import _ from 'lodash';

interface CreateContactProps {
    open: boolean;
    onClose: () => void;
    onCreate: () => void;
    contact?: Contact;
}

const CreateContactDialog = ({ open, onClose, onCreate, contact }: CreateContactProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setEmail(contact.email);
            setPhone(contact.phone);
            setIsEdit(true);
        }
    }, [contact]);

    const handleCreate = async () => {
        const params = {
            name,
            email,
            phone
        };
        if (contact?._id) {
            console.log('contact to update', contact);
            dispatch(actions.contact.edit({ ...contact, ...params }));
            dispatch(actions.contact.commit());
            dispatch(actions.contact.update(contact._id));
        } else {
            dispatch(actions.contact.create(params));
        }
        if (!_.isNil(onCreate) && _.isFunction(onCreate)) {
            onCreate();
        }
    };

    const handleClose = () => {
        setName('');
        setEmail('');
        setPhone('');
        onClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{!isEdit ? 'Create Contact' : 'Edit Contact'}</DialogTitle>
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreate} color='primary' variant='contained'>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateContactDialog;
