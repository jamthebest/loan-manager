import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import { State } from './redux';
import { API_URL } from '../config';

const name = 'contact';

/*
    Get contacts of the logged user
*/
const list = createAsyncThunk(`${name}/list`, async (params?: ContactParams) => {
    let query: { skip?: number, limit: number } = {
        limit: 10
    };
    if (params) {
        if (params.page) {
            query.skip = 10 * (params.page - 1);
        }
    }
    const response = (await axios.get<Array<Contact>>(`${API_URL}contacts/?query=${JSON.stringify(query)}`, {})).data;
    return response;
});

/**
 * Create a new Contact
 */
const create = createAsyncThunk(`${name}/create`, async (data: Contact) => {
    return (await axios.post<Contact>(`${API_URL}contacts/`, data)).data;
})

export const extraActions = { list, create };

export const slice = createSlice({
    name,
    initialState: {
        pending: false
    } as {
        pending: boolean,
        value?: Contact,
        changed?: Contact,
        changes?: Contact,
        error?: SerializedError,
        list?: Array<Contact>
    },
    reducers: {
        update(state, action: PayloadAction<Contact>) {
            if (!state.value) {
                throw new Error('No contact in store');
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
    }
});

export type Contact = {
    id?: string,
    name: string,
    email: string,
    phone: string,
};

export type ContactParams = {
    page: number
};