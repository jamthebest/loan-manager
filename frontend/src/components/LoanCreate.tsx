import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { actions, useTypedDispatch } from '../redux/redux';
import { Loan } from '../redux/loan';
import { Contact } from '../redux/contact';
import _ from 'lodash';
import moment from 'moment';

interface CreateLoanProps {
    open: boolean;
    onClose: () => void;
    onCreate: () => void;
    contacts?: Array<Contact>;
    loan?: Loan;
}

const CreateLoanDialog = ({ open, onClose, onCreate, contacts, loan }: CreateLoanProps) => {
    const [contactId, setContactId] = useState('');
    const [amount, setAmount] = useState(0);
    const [interest, setInterest] = useState(0);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if (loan) {
            setContactId(loan.contactId);
            setAmount(loan.amount);
            setInterest(loan.interest);
            setDate(loan.date);
            setIsEdit(true);
        }
    }, [loan]);

    const handleCreate = async () => {
        const params = {
            contactId,
            amount,
            interest,
            date
        };
        if (loan?._id) {
            console.log('loan to update', loan);
            dispatch(actions.loan.edit({ ...loan, ...params }));
            dispatch(actions.loan.commit());
            dispatch(actions.loan.update(loan._id));
        } else {
            dispatch(actions.loan.create(params));
        }
        if (!_.isNil(onCreate) && _.isFunction(onCreate)) {
            onCreate();
        }
        handleClose();
    };

    const handleClose = () => {
        setContactId('');
        setAmount(0);
        setInterest(0);
        setDate(moment().format('YYYY-MM-DD'));
        onClose();
    };

    const handleChange = (event: SelectChangeEvent) => {
        setContactId(event.target.value as string);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{!isEdit ? 'Create Loan' : 'Edit Loan'}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel id='contact-select-label'>Contact</InputLabel>
                    <Select
                        labelId='contact-select-label'
                        id='contact-select'
                        value={contactId}
                        label='Contact'
                        onChange={handleChange}
                    >
                        {
                            _.map(contacts || [], (contact) => {
                                return (<MenuItem key={contact._id} value={contact._id}>{contact.name}</MenuItem>);
                            })
                        }
                    </Select>
                </FormControl>
                <TextField
                    label='Amount'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={amount}
                    type='number'
                    id='create-amount'
                    onChange={(e) => setAmount(+e.target.value)}
                />
                <TextField
                    label='Interest'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={interest}
                    type='number'
                    id='create-interest'
                    onChange={(e) => setInterest(+e.target.value)}
                />
                <TextField
                    label='Date'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={date}
                    type='date'
                    id='create-date'
                    onChange={(e) => setDate(e.target.value)}
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

export default CreateLoanDialog;
