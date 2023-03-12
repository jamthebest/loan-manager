import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { actions, useTypedDispatch, useTypedSelector } from '../redux/redux';
import { Contact } from '../redux/contact';
import _ from 'lodash';
import FabButton from '../components/FabButton';
import CreateContact from '../components/ContactCreate';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Contacts = () => {
    const dispatch = useTypedDispatch();
    const { pending, contacts } = useTypedSelector(state => ({
        pending: state.contact.pending,
        contacts: state.contact.list
    }));

    const [page, setPage] = useState<number>(1);
    const [createOpen, setCreateOpen] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [contactToEdit, setContactToEdit] = useState<Contact | undefined>(undefined);

    useEffect(() => {
        dispatch(actions.contact.list({ page }));
    }, [page, createOpen]);

    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleDelete = (id: string) => { };
    const handleEdit = (id: string) => {
        setContactToEdit(contacts?.filter(con => { return con._id === id; })[0]);
        setCreateOpen(true);
    };

    return (
        <Container>
            <Grid container spacing={0} justifyContent='center'>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Actions</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {_.map(contacts || [], (contact: Contact) => (
                                <TableRow key={contact.email}>
                                    <TableCell align="right">
                                        <IconButton color="inherit" onClick={() => handleDelete(contact._id ?? '')}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton color="inherit" onClick={() => handleEdit(contact._id ?? '')}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
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
            <FabButton onClick={() => { setCreateOpen(true); setContactToEdit(undefined); }}></FabButton>
            <CreateContact open={createOpen}
                onClose={() => {
                    setCreateOpen(false);
                    setContactToEdit(undefined);
                }} onCreate={() => { setShowAlert(true); setCreateOpen(false); }}
                contact={contactToEdit}
            ></CreateContact>
            <Box sx={{ width: '100%' }}>
                <Collapse in={showAlert}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setShowAlert(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {!contactToEdit ? 'Contact Created!' : 'Contact Updated!'}
                    </Alert>
                </Collapse>
            </Box>
        </Container >
    );
};

export default Contacts;
