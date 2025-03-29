import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slice/user'
import filterReducer from './slice/filteration'


const store = configureStore({
    reducer:{
        user:userReducer,
        filter:filterReducer
    }
})

export type RootState = ReturnType<typeof store.getState> // store state error type
export type AppDispatch = typeof store.dispatch // dispatching functions type

export default store