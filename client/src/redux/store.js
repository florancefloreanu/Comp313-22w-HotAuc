/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client\src\redux\store.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\client
 * Created Date: Wednesday, February 23rd 2022, 12:19:53 pm
 * Author: Ting
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: crete redux store
 */


import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./features/itemSlice";
import dashbordItemReducer from "./features/dashboardItemsSlice";
import { userReducer } from "./features/userInforSlice";
import chatbotReducer from "./features/chatbotSlice";
import layoutSlice from "./features/layoutSlice";
import adminDashboardSlice from "./features/adminDashboardSlice";

export default configureStore({
	reducer: {
		item: itemSlice,
		userInfor: userReducer,
		dashboardItem: dashbordItemReducer,
		chatbotMessage: chatbotReducer,
		layout: layoutSlice,
		adminDashboard:adminDashboardSlice
	}
})
