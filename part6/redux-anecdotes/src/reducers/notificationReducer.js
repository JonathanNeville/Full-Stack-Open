const { createSlice } = require("@reduxjs/toolkit");

const initialState = [
    
        ''
    
]

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        changeMessage(state, action) {
            const message = action.payload
            state = [message]
            return state
        },
        resetMessage(state, action) {
            state = [action.payload]
            return state
        }
    }
})
export const {changeMessage, resetMessage} = notificationSlice.actions
export default notificationSlice.reducer