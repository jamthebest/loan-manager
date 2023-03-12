import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import { State } from './redux';
import { API_URL } from '../config';

const name = 'payment';

/*
    Get payments of the logged user
*/
const list = createAsyncThunk(`${name}/list`, async (params?: PaymentParams) => {
    let query: { skip?: number, limit?: number } = {};
    if (params) {
        if (params.page) {
            query.limit = 10;
            query.skip = 10 * (params.page - 1);
        }
    }
    const response = (await axios.get<Array<Payment>>(`${API_URL}payments/?query=${JSON.stringify(query)}`, {})).data;
    return response;
});

/**
 * Create a new Payment
 */
const create = createAsyncThunk(`${name}/create`, async (data: Payment) => {
    return (await axios.post<Payment>(`${API_URL}payments/`, data)).data;
});

/**
 * Update the current `payment`
 */
const update = createAsyncThunk(`${name}/submit`, async (paymentId: string, thunkAPI) => {
    const payment: Payment | undefined = (thunkAPI.getState() as State).payment.value;
    if (!payment) throw new Error('No payment in store');
    return (await axios.patch<Payment>(`${API_URL}payments/${paymentId}`, payment)).data;
});

/**
 * Create a new Payment
 */
const remove = createAsyncThunk(`${name}/create`, async (paymentId: string) => {
    return (await axios.delete<Payment>(`${API_URL}payments/${paymentId}`)).data;
});

export const extraActions = { list, create, update, remove };

export const slice = createSlice({
    name,
    initialState: {
        pending: false
    } as {
        pending: boolean,
        value?: Payment,
        changed?: Payment,
        changes?: Payment,
        error?: SerializedError,
        list?: Array<Payment>
    },
    reducers: {
        edit(state, action: PayloadAction<Payment>) {
            state.value = state.list?.filter(payment => { return payment._id === action.payload._id; })[0];
            if (!state.value) {
                throw new Error('No payment in store');
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

export type Payment = {
    _id?: string,
    loanId: string,
    amount: number,
    interestAmount: number,
    date: string
};

export type PaymentParams = {
    page: number
};