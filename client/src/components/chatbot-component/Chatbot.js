/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\chatbot-component\Chatbot.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Tuesday, March 29th 2022, 6:39:21 pm
 * Author: Jose
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Chatbot on home page
 */

import React, { useEffect } from 'react';
import axios from "axios"
import "./Chatbot.css"
import { SERVER_URL } from "../../ConstantValue"
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../redux/features/chatbotSlice';


export default function Chatbot() {
  const dispatch = useDispatch();
  const reduxMessages = useSelector(state => state.chatbotMessage.messages);
  const BASE_URL = "https://mighty-mesa-33042.herokuapp.com/"

  useEffect(() => {
    if (reduxMessages.length < 1) {

      eventQuery('welcomeWebsite');
    }
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
        const resContent = 'payload' in response.data.fulfillmentMessages[0] || response.data.fulfillmentMessages[0].text.text[0] !== "" ? response.data.fulfillmentMessages[0] : response.data.fulfillmentMessages[1];
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
          text: { text: 'Error' }
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
          text: { text: 'Error' }
        }
      }
      dispatch(saveMessage(message));
    }
  }

  const handleSubmit = (e) => {
    if (typeof(e) === 'string') {
      const messageBox = document.getElementById('user-message');
      textQuery(e);
      messageBox.value = '';
    }
    else {
      e.preventDefault();
      textQuery(e.target[0].value);
      e.target[0].value = '';
    }
    scrollToBottom();
  }

  const scrollToBottom = () => {
    let bubbles = document.getElementsByClassName('chat-content')[0];
    if (bubbles) {
      bubbles.scrollTop = bubbles.scrollHeight;
    }
  }

  const sendQuestion = (message) => {
    handleSubmit(message);
  }

  const loadMessage = () => {
    setTimeout(
      function () {
        // hide typing dots
        let typingDots = document.querySelectorAll('.bubble-message.bot .typing');
        typingDots[typingDots.length - 1]?.classList.add('d-none');

        // display message
        let msgToDisplay = document.querySelectorAll('.bubble-message.bot .content.d-none');
        msgToDisplay[msgToDisplay.length - 1]?.classList.remove('d-none');

        // display button links
        let buttonContainer = document.querySelectorAll('.button-container.d-none');
        buttonContainer[buttonContainer.length - 1]?.classList.remove('d-none');
        scrollToBottom();
      }, 500);
  }

  const renderMessage = (message) => {
    let isBot = message.from === 'bot';
    if (message.content.text !== undefined) {
      if (isBot) {
        return (
          <div className='bubble-container'>
            <div className='avatar'><i className="fa-solid fa-robot fa-lg"></i></div>
            <div className='bubble-space-blue bot'>
              <div className='bubble-space-white bot'></div>
            </div>
            <p className='bubble-message text-white bot'>
              <span className="typing d-block">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <span className='content d-none'>
                {message.content.text.text}
              </span>
            </p>
          </div>
        );
      }
      else {
        return (
          <div className='bubble-container'>
            <p className='ms-auto bubble-message user'>{message.content.text.text}</p>
            <div className='bubble-space-blue user'>
              <div className='bubble-space-white user'></div>
            </div>
          </div>
        );
      }
    }
    else if (message.content.payload !== undefined) {
      return (
        <>
          <div className='bubble-container'>
            <div className='avatar'><i className="fa-solid fa-robot fa-lg"></i></div>
            <div className='bubble-space-blue bot'>
              <div className='bubble-space-white bot'></div>
            </div>
            <p className='bubble-message text-white bot'>
              <span className="typing d-block">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <span className='content d-none'>{message.content.payload.fields.message.stringValue}</span>
            </p>
          </div>
          <div className='button-container d-none'>
            {'stringValue' in message.content.payload.fields.name ?
              (<a href={BASE_URL + message.content.payload.fields.url.stringValue} className='link-button'>
                {message.content.payload.fields.name.stringValue}
              </a>)
              :
              (message.content.payload.fields.name.listValue.values?.map((el) => {
                return (
                  <span className='link-button me-2 mb-2 small' onClick={() => sendQuestion(el.stringValue)}>
                    {el.stringValue}
                  </span>
                )
              }))
            }



          </div>
        </>
      );
    }
  }

  const toggleChatBot = () => {
    document.getElementsByClassName('chatbot-button')[0]?.classList.toggle('d-none');
    document.getElementsByClassName('chatbot-box')[0]?.classList.toggle('d-none');
  }

  return (
    <>
      <button className='chatbot chatbot-button rounded-circle' onClick={() => toggleChatBot()}><i className="fa-solid fa-robot fa-2x text-white"></i></button>
      <div className='chatbot chatbot-box mr-2 d-none shadow-lg'>
        <div className='px-3 py-2 chat-header'>
          Hugo
          <button onClick={() => toggleChatBot()} className='ms-auto fs-5'>&times;</button>
        </div>
        <div className='p-3 chat-content'>
          {reduxMessages?.map((msg) => {
            return (
              <>
                {renderMessage(msg)}
              </>
            )
          })}

          {scrollToBottom()}
          {loadMessage()}

          <form className='shadow-lg' onSubmit={handleSubmit}>
            <div className="input-group mt-auto">
              <input
                className='flex-grow-1'
                id='user-message'
                name='user-message'
                type="text"
                required />
              <button
                className="btn btn-outline-primary m-0"
                type="submit"
                id="button-addon2"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
