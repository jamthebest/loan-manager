import React, { useEffect, useState } from 'react';
import { Button, Container, Dialog, DialogActions, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { actions, useTypedDispatch, useTypedSelector } from '../redux/redux';
import { Loan } from '../redux/loan';
import { Contact } from '../redux/contact';
import _ from 'lodash';
import FabButton from '../components/FabButton';
import CreateLoan from '../components/LoanCreate';
import CreatePayment from '../components/PaymentCreate';
import AlertDialog from '../components/AlertDialog';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

const getStatusMap = (status: string | undefined) => {
    switch(status) {
        case 'A':
            return 'Active';
        case 'C':
            return 'Cancelled';
        case 'P':
            return 'Paid';
        default:
            return 'Not Found';
    }
};

const Loans = () => {
    const dispatch = useTypedDispatch();
    const { pending, loans, contacts } = useTypedSelector(state => ({
        pending: state.loan.pending && state.contact.pending,
        loans: state.loan.list,
        contacts: state.contact.list
    }));

    const [page, setPage] = useState<number>(1);
    const [createOpen, setCreateOpen] = useState<boolean>(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);
    const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
    const [loanToEdit, setLoanToEdit] = useState<Loan | undefined>(undefined);

    useEffect(() => {
        dispatch(actions.loan.list({ page }));
        dispatch(actions.contact.list());
    }, [page, createOpen, isDeleteAlertOpen, isPaymentOpen]);

    const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleDelete = (id: string) => {
        setLoanToEdit(loans?.filter(con => { return con._id === id; })[0]);
        setIsDeleteAlertOpen(true);
    };
    const handleEdit = (id: string) => {
        setLoanToEdit(loans?.filter(con => { return con._id === id; })[0]);
        setCreateOpen(true);
    };
    const handleDeleteAlertClose = (willDeleted: boolean) => {
        if (willDeleted && loanToEdit?._id) {
            dispatch(actions.loan.remove(loanToEdit._id));
        }
        setLoanToEdit(undefined);
        setIsDeleteAlertOpen(false);
    };
    const handlePayment = (id: string) => {
        setLoanToEdit(loans?.filter(con => { return con._id === id; })[0]);
        setIsPaymentOpen(true);
    };
    const handleCancel = (id: string) => {
        setLoanToEdit(loans?.filter(con => { return con._id === id; })[0]);
        setIsCancelOpen(true);
    };
    const handleCancelAlertClose = (willCancel: boolean) => {
        if (willCancel && loanToEdit?._id) {
            dispatch(actions.loan.edit({ ...loanToEdit, status: 'C' }));
            dispatch(actions.loan.commit());
            dispatch(actions.loan.update(loanToEdit._id));
        }
        setLoanToEdit(undefined);
        setIsCancelOpen(false);
    };

    if (pending) {
        return <div>Loading</div>
    }

    return (
        <Container>
            <Grid container spacing={0} justifyContent='center'>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Actions</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Interest</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {_.map(loans || [], (loan: Loan) => (
                                <TableRow key={loan._id}>
                                    <TableCell align='left'>
                                        <IconButton color='error' onClick={() => handleDelete(loan._id ?? '')}>
                                            <DeleteIcon />
                                        </IconButton>
                                        {loan.status === 'A' && <IconButton color='success' onClick={() => handleEdit(loan._id ?? '')}>
                                            <EditIcon />
                                        </IconButton>}
                                        {loan.status === 'A' && <IconButton color='success' onClick={() => handlePayment(loan._id ?? '')}>
                                            <AttachMoneyIcon />
                                        </IconButton>}
                                        {loan.status === 'A' && <IconButton color='warning' onClick={() => handleCancel(loan._id ?? '')}>
                                            <CancelTwoToneIcon></CancelTwoToneIcon>
                                        </IconButton>}
                                    </TableCell>
                                    <TableCell>{(contacts || []).filter(contact => { return contact._id === loan.contactId })[0]?.name}</TableCell>
                                    <TableCell>{loan.amount}</TableCell>
                                    <TableCell>{loan.interest}</TableCell>
                                    <TableCell>{loan.date}</TableCell>
                                    <TableCell>{getStatusMap(loan.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component='div'
                        rowsPerPageOptions={[10]}
                        count={1000} // Número total de loanos disponibles
                        rowsPerPage={10}
                        page={page - 1}
                        onPageChange={handlePageChange}
                    />
                </TableContainer>
            </Grid>
            {pending && <p>Loading...</p>}
            <FabButton onClick={() => { setCreateOpen(true); setLoanToEdit(undefined); }}></FabButton>

            <CreateLoan open={createOpen}
                onClose={() => {
                    setCreateOpen(false);
                    setLoanToEdit(undefined);
                }}
                onCreate={() => { setShowAlert(true); setCreateOpen(false); }}
                contacts={contacts}
                loan={loanToEdit}
            ></CreateLoan>

            <CreatePayment open={isPaymentOpen && !!loanToEdit}
                onClose={() => {
                    setCreateOpen(false);
                    setLoanToEdit(undefined);
                }}
                onCreate={() => { setShowAlert(true); setIsPaymentOpen(false); }}
                loanToPay={loanToEdit?._id ?? ''}
            ></CreatePayment>

            <Box sx={{ width: '100%' }}>
                <Collapse in={showAlert}>
                    <Alert
                        action={
                            <IconButton
                                aria-label='close'
                                color='inherit'
                                size='small'
                                onClick={() => {
                                    setShowAlert(false);
                                }}
                            >
                                <CloseIcon fontSize='inherit' />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {!loanToEdit ? 'Loan Created!' : 'Loan Updated!'}
                    </Alert>
                </Collapse>
            </Box>

            <AlertDialog
                open={isDeleteAlertOpen}
                title='Are you sure you want to delete?'
                okTitle='Delete'
                okColor='error'
                cancelColor='primary'
                onClose={handleDeleteAlertClose}
            ></AlertDialog>

            <AlertDialog
                open={isCancelOpen}
                title='Are you sure you want to cancel?'
                okTitle='Yes'
                noTitle='No'
                okColor='error'
                cancelColor='primary'
                onClose={handleCancelAlertClose}
            ></AlertDialog>
        </Container >
    );
};

export default Loans;
