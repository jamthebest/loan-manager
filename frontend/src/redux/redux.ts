import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { extraActions as contactExtraActions, slice as contactSlice } from './contact';
import { extraActions as loanExtraActions, slice as loanSlice } from './loan';
import { extraActions as paymentExtraActions, slice as paymentSlice } from './payment';

export const actions = {
    [contactSlice.name]: { ...contactSlice.actions, ...contactExtraActions },
    [loanSlice.name]: { ...loanSlice.actions, ...loanExtraActions },
    [paymentSlice.name]: { ...paymentSlice.actions, ...paymentExtraActions },
}

export const store = configureStore({
    reducer: {
        [contactSlice.name]: contactSlice.reducer,
        [loanSlice.name]: loanSlice.reducer,
        [paymentSlice.name]: paymentSlice.reducer,
    },
})

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<State> = useSelector
export const useTypedDispatch = () => useDispatch() as Dispatch
