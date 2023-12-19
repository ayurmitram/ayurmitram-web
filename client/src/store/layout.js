import { createSlice } from '@reduxjs/toolkit'

const layoutSlice = createSlice({
    name: 'layout',
    initialState: {
        tabValue: 0,
        isMinimized: false,
        activeBot: 'chat', // chat or quiz
        selectedResponses: [],
        language: 'English',
        newMessageFunction: null,
        showTabs: window.innerWidth < 1024 ? false : true
    },
    reducers: {
        setTabValue(state, action) {
            state.tabValue = action.payload
        },
        setIsMinimized(state, action) {
            state.isMinimized = action.payload
        },
        setActiveBot(state, action) {
            state.activeBot = action.payload
        },
        setLanguage(state, action) {
            state.language = action.payload
        },
        setNewMessageFunction(state, action) {
            state.newMessageFunction = action.payload
        },
        setShowTabs(state, action) {
            state.showTabs = action.payload
        },
        setSelectedResponses(state, action) {
            state.selectedResponses = action.payload
        }
    }
})

export const { setTabValue, setIsMinimized, setActiveBot, setLanguage, setNewMessageFunction, setShowTabs, setSelectedResponses } = layoutSlice.actions

export default layoutSlice.reducer