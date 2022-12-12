const { createSlice } = require("@reduxjs/toolkit");

const initialState = [
    
        ''
    
]

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setMessage(state, action) {
            state = [action.payload]
            return state
        }
    }
})

let timeoutID

export const changeMessage  = (message, time) => {
    return async (dispatch) => {
        dispatch(setMessage(message))
        
        clearTimeout(timeoutID)
        
        timeoutID = setTimeout(() => {
            dispatch(setMessage(''))
        }, time * 1000);
    }

}

export const {setMessage} = notificationSlice.actions
export default notificationSlice.reducer