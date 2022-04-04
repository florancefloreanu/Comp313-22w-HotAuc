/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\redux\features\chatbotSlice.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Tuesday, March 29th 2022, 6:39:21 pm
 * Author: Jose
 * 
 * Copyright (c) 2022 HotaUC
 * 
 * Purpose: save chatbot related states
 */

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