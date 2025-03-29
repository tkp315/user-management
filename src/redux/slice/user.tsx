import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitialState {
    isLoggedIn:boolean
}
const initialState:InitialState = {
    isLoggedIn:JSON.parse(sessionStorage.getItem('isLoggedIn')||'false')as boolean
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        updateStatus:(state,action:PayloadAction<InitialState>)=>{
         state.isLoggedIn= action.payload.isLoggedIn
         sessionStorage.setItem('isLoggedIn',JSON.stringify(state.isLoggedIn))

        }
    }
})

export const {updateStatus} = userSlice.actions
export default userSlice.reducer