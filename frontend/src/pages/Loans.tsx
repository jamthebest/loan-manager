import React, { useEffect, useState } from 'react';
import { Button, Container, Dialog, DialogActions, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { actions, useTypedDispatch, useTypedSelector } from '../redux/redux';
import { Loan } from '../redux/loan';
import { Contact } from '../redux/contact';
import _ from 'lodash';
import FabButton from '../components/FabButton';
import CreateLoan from '../components/LoanCreate';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Loans = () => {
    const dispatch = useTypedDispatch();
    const { pending, loans, contacts } = useTypedSelector(state => ({
        pending: state.loan.pending && state.contact.pending,
        loans: state.loan.list,
        contacts: state.contact.list
    }));

    const [page, setPage] = useState<number>(1);
    const [createOpen, setCreateOpen] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);
    const [loanToEdit, setLoanToEdit] = useState<Loan | undefined>(undefined);

    useEffect(() => {
        dispatch(actions.loan.list({ page }));
        dispatch(actions.contact.list());
    }, [page, createOpen, isDeleteAlertOpen]);

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
        setIsDeleteAlertOpen(false);
        if (willDeleted && loanToEdit?._id) {
            dispatch(actions.loan.remove(loanToEdit._id));
        }
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
                                        <IconButton color='success' onClick={() => handleEdit(loan._id ?? '')}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{(contacts || []).filter(contact => { return contact._id === loan.contactId })[0]?.name}</TableCell>
                                    <TableCell>{loan.amount}</TableCell>
                                    <TableCell>{loan.interest}</TableCell>
                                    <TableCell>{loan.date}</TableCell>
                                    <TableCell>{loan.status}</TableCell>
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
                }} onCreate={() => { setShowAlert(true); setCreateOpen(false); }}
                contacts={contacts}
                loan={loanToEdit}
            ></CreateLoan>

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

            <div>
                <Dialog
                    open={isDeleteAlertOpen}
                    onClose={() => { handleDeleteAlertClose(false) }}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <DialogTitle id='alert-dialog-title'>
                        Are you sure you want to delete?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => { handleDeleteAlertClose(false) }}>Cancel</Button>
                        <Button onClick={() => { handleDeleteAlertClose(true) }} variant='contained' color='error'>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Container >
    );
};

export default Loans;
