import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./features/itemSlice";
import dashbordItemReducer from "./features/dashboardItemsSlice";
import { userReducer } from "./features/userInforSlice";
import chatbotReducer from "./features/chatbotSlice";
import layoutSlice from "./features/layoutSlice";

export default configureStore({
	reducer: {
		item: itemSlice,
		userInfor: userReducer,
		dashboardItem: dashbordItemReducer,
		chatbotMessage: chatbotReducer,
		layout: layoutSlice
	}
})
