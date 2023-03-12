import React, { useEffect, useState } from 'react';
import { Button, Container, Dialog, DialogActions, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

interface AlertDialogProps {
    open: boolean;
    title: string;
    okTitle: string;
    noTitle?: string;
    cancelColor?: 'error' | 'inherit' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | undefined;
    okColor?: 'error' | 'inherit' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | undefined;
    onClose: (okClick: boolean) => void;
};

const AlertDialog = ({ open, onClose, title, okTitle, noTitle, cancelColor, okColor }: AlertDialogProps) => {

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => { onClose(false) }}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {title}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => { onClose(false) }} color={cancelColor || 'error'}>{noTitle || 'Cancel'}</Button>
                    <Button onClick={() => { onClose(true) }} variant='contained' color={okColor || undefined}>
                        {okTitle}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);
};

export default AlertDialog;