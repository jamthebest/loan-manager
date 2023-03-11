import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { extraActions as contactExtraActions, slice as contactSlice } from './contact';

export const actions = {
    [contactSlice.name]: { ...contactSlice.actions, ...contactExtraActions },
}

export const store = configureStore({
    reducer: {
        [contactSlice.name]: contactSlice.reducer,
    },
})

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<State> = useSelector
export const useTypedDispatch = () => useDispatch() as Dispatch
