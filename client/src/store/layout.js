import { createSlice } from '@reduxjs/toolkit'

const layoutSlice = createSlice({
    name: 'layout',
    initialState: {
        tabValue: 0,
    },
    reducers: {
        setTabValue(state, action) {
            state.tabValue = action.payload
        }
    }
})

export const { setTabValue } = layoutSlice.actions

export default layoutSlice.reducer