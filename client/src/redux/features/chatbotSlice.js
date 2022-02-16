import { createSlice } from '@reduxjs/toolkit'

const chatbotSlice = createSlice({
    name: 'message',
    initialState: {
        messages: []
    },
    reducers: {
        saveMessage: (state, action) => {
            // console.log("!!!!!!!!!!!!!!!!!!Here you are in reducer!" + JSON.stringify(action.payload))
            let messages = state.messages;
            messages.push(action.payload)
            state = {
                ...state,
                messages: messages
                // messages: state.messages.concat(action.payload)
            }
        }
    },
})
export const { saveMessage } = chatbotSlice.actions
export default chatbotSlice.reducer