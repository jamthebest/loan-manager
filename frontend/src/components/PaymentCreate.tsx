import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { actions, useTypedDispatch } from '../redux/redux';
import { Payment } from '../redux/payment';
import { Loan } from '../redux/loan';
import _ from 'lodash';
import moment from 'moment';

interface CreatePaymentProps {
    open: boolean;
    onClose: () => void;
    onCreate: () => void;
    loanToPay: string;
    payment?: Payment;
}

const CreatePaymentDialog = ({ open, onClose, onCreate, loanToPay, payment }: CreatePaymentProps) => {
    const [loanId, setLoanId] = useState(loanToPay);
    const [amount, setAmount] = useState(0);
    const [interestAmount, setInterestAmount] = useState(0);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if (payment) {
            setLoanId(payment.loanId);
            setAmount(payment.amount);
            setInterestAmount(payment.interestAmount);
            setDate(payment.date);
            setIsEdit(true);
        }
    }, [payment]);

    const handleCreate = async () => {
        const params = {
            loanId,
            amount,
            interestAmount,
            date
        };
        if (payment?._id) {
            console.log('payment to update', payment);
            dispatch(actions.payment.edit({ ...payment, ...params }));
            dispatch(actions.payment.commit());
            dispatch(actions.payment.update(payment._id));
        } else {
            dispatch(actions.payment.create(params));
        }
        if (!_.isNil(onCreate) && _.isFunction(onCreate)) {
            onCreate();
        }
    };

    const handleClose = () => {
        setLoanId('');
        setAmount(0);
        setInterestAmount(0);
        setDate(moment().format('YYYY-MM-DD'));
        onClose();
    };

    const handleChange = (event: SelectChangeEvent) => {
        setLoanId(event.target.value as string);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{!isEdit ? 'Create Payment' : 'Edit Payment'}</DialogTitle>
            <DialogContent>
                {/* <FormControl fullWidth>
                    <InputLabel id='loan-select-label'>Loan</InputLabel>
                    <Select
                        labelId='loan-select-label'
                        id='loan-select'
                        value={loanId}
                        label='Loan'
                        onChange={handleChange}
                    >
                        {
                            _.map(loans || [], (loan) => {
                                return (<MenuItem key={loan._id} value={loan._id}>{loan.name}</MenuItem>);
                            })
                        }
                    </Select>
                </FormControl> */}
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
                    value={interestAmount}
                    type='number'
                    id='create-interest'
                    onChange={(e) => setInterestAmount(+e.target.value)}
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

export default CreatePaymentDialog;
