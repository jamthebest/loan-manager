import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { actions, useTypedDispatch, useTypedSelector } from '../redux/redux';
import { Payment } from '../redux/payment';
import _ from 'lodash';

const Payments = () => {
    const dispatch = useTypedDispatch();
    const { pending, payments, contacts, loans } = useTypedSelector(state => ({
        pending: state.payment.pending && state.contact.pending && state.loan.pending,
        payments: state.payment.list,
        contacts: state.contact.list,
        loans: state.loan.list
    }));

    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        dispatch(actions.payment.list({ page }));
        dispatch(actions.contact.list());
        dispatch(actions.loan.list());
    }, [page]);

    const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
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
                                <TableCell>Contact</TableCell>
                                <TableCell>Loan Amount</TableCell>
                                <TableCell>Payment Amount</TableCell>
                                <TableCell>Loan Interest %</TableCell>
                                <TableCell>Interest Amount</TableCell>
                                <TableCell>Loan Date</TableCell>
                                <TableCell>Payment Date</TableCell>
                                <TableCell>Loan Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {_.map(payments || [], (payment: Payment) => (
                                <TableRow key={payment._id}>
                                    <TableCell>{(contacts || []).filter(contact => { return contact._id === (_.filter(loans || [], loan => { return loan._id === payment.loanId }))[0]?.contactId })[0]?.name}</TableCell>
                                    <TableCell>{_.filter(loans || [], loan => { return loan._id === payment.loanId })[0]?.amount}</TableCell>
                                    <TableCell>{payment.amount}</TableCell>
                                    <TableCell>{_.filter(loans || [], loan => { return loan._id === payment.loanId })[0]?.interest}</TableCell>
                                    <TableCell>{payment.interestAmount}</TableCell>
                                    <TableCell>{_.filter(loans || [], loan => { return loan._id === payment.loanId })[0]?.date}</TableCell>
                                    <TableCell>{payment.date}</TableCell>
                                    <TableCell>{_.filter(loans || [], loan => { return loan._id === payment.loanId })[0]?.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component='div'
                        rowsPerPageOptions={[10]}
                        count={1000} // Número total de paymentos disponibles
                        rowsPerPage={10}
                        page={page - 1}
                        onPageChange={handlePageChange}
                    />
                </TableContainer>
            </Grid>
            {pending && <p>Loading...</p>}
        </Container >
    );
};

export default Payments;
