import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { actions, useTypedDispatch, useTypedSelector } from '../redux/redux';
import _ from 'lodash';
import FabButton from './FabButton';

interface Contact {
    name: string;
    email: string;
    phone: string;
};

const Contacts = () => {
    const dispatch = useTypedDispatch();
    const { pending, contacts } = useTypedSelector(state => ({
        pending: state.contact.pending,
        contacts: state.contact.list
    }));

    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        dispatch(actions.contact.list({ page }));
    }, [page]);
    console.log(contacts);

    const handleScroll = debounce(() => {
        const bottom =
            Math.ceil(window.innerHeight + window.scrollY) >=
            document.documentElement.scrollHeight;
        console.log(bottom);
    }, 500);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    return (
        <Container>
            <Grid container spacing={0} justifyContent='center'>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {_.map(contacts || [], (contact: Contact) => (
                                <TableRow key={contact.email}>
                                    <TableCell>{contact.name}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component='div'
                        rowsPerPageOptions={[10]}
                        count={1000} // Número total de contactos disponibles
                        rowsPerPage={10}
                        page={page - 1}
                        onPageChange={handlePageChange}
                    />
                </TableContainer>
            </Grid>
            {pending && <p>Loading...</p>}
            <FabButton onClick={() => { console.log('click') }}></FabButton>
        </Container>
    );
};

export default Contacts;
