import { createSlice } from '@reduxjs/toolkit'

const chatbotSlice = createSlice({
    name: 'message',
    initialState: {
        messages: []
    },
    reducers: {
        saveMessage: (state, action) => {
            let messages = state.messages;
                if (messages.length < 0 || messages[messages.length - 1]?.from !== action.payload.from) {

                    messages.push(action.payload)
                    state = {
                        ...state,
                        messages: messages
                    }
                }
            else {

            }
            
        }
    },
})


export const { saveMessage } = chatbotSlice.actions
export default chatbotSlice.reducer