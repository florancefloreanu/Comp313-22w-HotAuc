import { createSlice } from '@reduxjs/toolkit'

const chatbotSlice = createSlice({
    name: 'message',
    initialState: {
        messages: []
    },
    reducers: {
        saveMessage: (state, action) => {
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

// function saveMessage(data) {
//     return {
//         type: SAVE_MESSAGE,
//         payload: data
//     }
// }


export const { saveMessage } = chatbotSlice.actions
export default chatbotSlice.reducer