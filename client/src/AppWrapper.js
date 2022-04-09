/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\AppWrapper.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Monday, February 28th 2022, 10:30:11 am
 * Author: Han
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Connect redux store
 */

import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import store from "./redux/store"

function AppWrapper() {
  return (
      <Provider store={store}>
          <App/>
   </Provider>
  )
}

export default AppWrapper