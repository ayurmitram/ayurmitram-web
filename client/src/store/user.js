import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        details: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.details = action.payload
        },
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer