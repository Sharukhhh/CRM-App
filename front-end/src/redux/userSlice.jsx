import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userData:  null
}


const userAuthSlice = createSlice({
    name: 'user_crm',
    initialState,

    reducers : {

        saveData : (state , action) => {
            state.userData = action.payload;
        },

        logout : (state) => {
            state.userData = null;
        }
    }
});

export const {saveData , logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;