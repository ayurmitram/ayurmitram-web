import { createSlice } from '@reduxjs/toolkit'

const layoutSlice = createSlice({
    name: 'layout',
    initialState: {
        tabValue: 0,
        isMinimized: false,
        activeBot: 'chat' // chat or quiz
    },
    reducers: {
        setTabValue(state, action) {
            state.tabValue = action.payload
        },
        setIsMinimized(state, action) {
            state.isMinimized = action.payload
        }
    }
})

export const { setTabValue, setIsMinimized } = layoutSlice.actions

export default layoutSlice.reducer