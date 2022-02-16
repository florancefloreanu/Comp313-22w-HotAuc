import React, { useEffect } from 'react';
import axios from "axios"
import "./Chatbot.css"
import { SERVER_URL } from "../../ConstantValue"
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../redux/features/chatbotSlice';


export default function Chatbot() {
    const dispatch = useDispatch();
    const reduxMessages = useSelector(state => state.chatbotMessage.messages);

    useEffect(() => {
        eventQuery('welcomeWebsite');
    }, []);

    const textQuery = async (userMsgValue) => {
        // handle the message sent from the user
        let message = {
            from: 'user',
            content: {
                // response from DialogFlow has nested text structure
                text: {
                    text: userMsgValue
                }
            }
        }
        dispatch(saveMessage(message));

        const request = {
            text: userMsgValue
        }

        // handle the message sent from the chatbot
        try {
            // send a post request to backend (/textQuery)
            await axios.post(`${SERVER_URL}dialogflow/textQuery`, request, { mode: 'cors' }).then((response) => {
                const resContent = response.data.fulfillmentMessages[0];

                message = {
                    from: 'bot',
                    content: resContent
                }

                dispatch(saveMessage(message));
            });
        } catch (error) {
            message = {
                from: 'bot',
                content: {
                    text: {
                        text: 'Error'
                    }
                }
            }
            dispatch(saveMessage(message));
        }
    }

    const eventQuery = async (eventName) => {
        const request = {
            event: eventName
        }

        // handle the message sent from the chatbot
        try {
            // send a post request to backend (/textQuery)
            await axios.post(`${SERVER_URL}dialogflow/eventQuery`, request, { mode: 'cors' }).then((response) => {
                const resContent = response.data.fulfillmentMessages[0];

                let message = {
                    from: 'bot',
                    content: resContent
                }

                dispatch(saveMessage(message));
            });
        } catch (error) {
            let message = {
                from: 'bot',
                content: {
                    text: {
                        text: 'Error'
                    }
                }
            }
            dispatch(saveMessage(message));
        }
    }

    const keyPressHandler = (e) => {
        if (e.key === "Enter") {

            return alert(e.target.value);
        }
    }

    const clickHandler = (e) => {
        const message = document.getElementById('user-message').value;
        if (message !== '') {
            return alert(message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        textQuery(e.target[0].value);
        // console.log(e.target[0].value);
        e.target[0].value = '';
    }

    const renderSingleMessage = (message, i) => {
        console.log(message);
    }

    const renderMessages = (messages) => {
        if (messages) {
            return messages.map((message, i) => {
                return (
                    <div id='i'>

                    </div>
                )
            })
        }
        else {
            return null;
        }
    }

    // const scrollToBottom = () => {
    //     this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    // }

    return (
        <div className='d-none chatbot chatbot-box mb-3 mr-2 p-3'>
            <div className='chatbot d-none'>
                Chatbot!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            </div>

            {reduxMessages?.map((msg, i) => {
                return (
                        <div className='border p-2 m-2' key={i}>
                            {i}
                            <p>{msg.from}</p>
                            <p>{msg.content.text.text}</p>
                        </div>
                )
            })}

            <form onSubmit={handleSubmit}>
                <div className="input-group mt-auto">
                    <input
                        className='flex-grow-1'
                        id='user-message'
                        name='user-message'
                        type="text" />
                    <button
                        className="btn btn-outline-secondary"
                        type="submit"
                        id="button-addon2"
                    >
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}
