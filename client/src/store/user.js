import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
    }
})

export const { setTabValue, setIsMinimized } = userSlice.actions

export default userSlice.reducer