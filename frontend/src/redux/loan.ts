import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import { State } from './redux';
import { API_URL } from '../config';

const name = 'loan';

/*
    Get loans of the logged user
*/
const list = createAsyncThunk(`${name}/list`, async (params?: LoanParams) => {
    let query: { skip?: number, limit?: number } = {};
    if (params) {
        if (params.page) {
            query.limit = 10;
            query.skip = 10 * (params.page - 1);
        }
    }
    const response = (await axios.get<Array<Loan>>(`${API_URL}loans/?query=${JSON.stringify(query)}`, {})).data;
    return response;
});

/**
 * Create a new Loan
 */
const create = createAsyncThunk(`${name}/create`, async (data: Loan) => {
    return (await axios.post<Loan>(`${API_URL}loans/`, data)).data;
});

/**
 * Update the current `loan`
 */
const update = createAsyncThunk(`${name}/submit`, async (loanId: string, thunkAPI) => {
    const loan: Loan | undefined = (thunkAPI.getState() as State).loan.value;
    if (!loan) throw new Error('No loan in store');
    return (await axios.patch<Loan>(`${API_URL}loans/${loanId}`, loan)).data;
});

/**
 * Create a new Loan
 */
const remove = createAsyncThunk(`${name}/create`, async (loanId: string) => {
    return (await axios.delete<Loan>(`${API_URL}loans/${loanId}`)).data;
});

export const extraActions = { list, create, update, remove };

export const slice = createSlice({
    name,
    initialState: {
        pending: false
    } as {
        pending: boolean,
        value?: Loan,
        changed?: Loan,
        changes?: Loan,
        error?: SerializedError,
        list?: Array<Loan>
    },
    reducers: {
        edit(state, action: PayloadAction<Loan>) {
            state.value = state.list?.filter(loan => { return loan._id === action.payload._id; })[0];
            if (!state.value) {
                throw new Error('No loan in store');
            }
            state.changes = { ...(state.changes ?? {}), ...action.payload };
            state.changed = { ...state.value, ...state.changes };
        },
        reset(state) {
            state.changed = state.value;
            delete state.changes;
        },
        commit(state) {
            state.value = state.changed ?? state.value;
            delete state.changes;
        },
    },
    extraReducers: builder => {
        builder.addCase(list.pending, state => {
            state.pending = true;
            delete state.value;
        });
        builder.addCase(list.rejected, (state, action) => {
            state.pending = false;
            state.error = action.error;
        });
        builder.addCase(list.fulfilled, (state, action) => {
            state.pending = false;
            state.list = action.payload;
        });

        builder.addCase(create.pending, state => {
            state.pending = true;
        });
        builder.addCase(create.rejected, (state, action) => {
            state.pending = false;
            state.error = action.error;
        });
        builder.addCase(create.fulfilled, (state, action) => {
            state.pending = false;
            state.value = action.payload;
            state.changed = { ...state.value, ...state.changes };
        });

        builder.addCase(update.pending, state => {
            state.pending = true;
        });
        builder.addCase(update.rejected, (state, action) => {
            state.pending = false;
            state.error = action.error;
        });
        builder.addCase(update.fulfilled, (state, action) => {
            state.pending = false;
            state.value = action.payload;
            state.changed = { ...state.value, ...state.changes };
        });
    }
});

export type Loan = {
    _id?: string,
    contactId: string,
    amount: number,
    balance?: number,
    interest: number,
    date: string,
    status?: string
};

export type LoanParams = {
    page: number
};