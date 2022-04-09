/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\components\contact-component\Contact.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Tuesday, March 29th 2022, 6:39:21 pm
 * Author: Heesoo
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Contact info page 
 */

import React, { useEffect } from 'react';
import "./Contact.css"


export default function Contact() {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='contact-container d-flex p-4 m-4 w-50 mx-auto bg-white shadow'>
      <div className='px-5 text-center'>
        <i className="pt-5 fa-solid fa-envelopes-bulk fa-6x text-secondary"></i>
        <h2 className='mt-5 mb-3'>Contact us</h2>
        <p className='mb-0'>Need to contact us? Please fill out the form with your information and inquiry.</p>
        <p>Otherswise email us on <a href='mailto:HotAuc@gmail.com'>HotAuc@gmail.com</a>.</p>
      </div>

      <form className='ms-4 w-50 pe-4' id='contact-form' onSubmit={handleSubmit}>
        <div className="row g-3 align-items-center">
          <div className="col-6">
            <label htmlFor="firstname" className="col-form-label">First Name</label>
            <input type="text" id="firstname" className="form-control" />
          </div>
          <div className="col-6">
            <label htmlFor="lastname" className="col-form-label">Last Name</label>
            <input type="text" id="lastname" className="form-control" />
          </div>
        </div>
        <div className="mb-1">
          <label htmlFor="exampleFormControlInput1" className="form-label">Message</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" />
        </div>
        <div className="mb-1">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Additional Details</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <button type='submit' className='btn btn-primary w-100 mx-0 mt-2'>Send</button>
      </form>
    </div>
  )
}
