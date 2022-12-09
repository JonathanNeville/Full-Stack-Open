const { createSlice } = require("@reduxjs/toolkit");

const initialState = [
    
        'Hello world'
    
]

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        changeMessage(state, action) {
            const message = action.payload
            state = [message]
        }
    }
})
export const {changeMessage} = notificationSlice.actions
export default notificationSlice.reducer