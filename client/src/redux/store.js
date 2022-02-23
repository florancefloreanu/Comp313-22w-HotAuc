import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./features/itemSlice";
import dashbordItemReducer from "./features/dashboardItemsSlice";
import { userReducer } from "./features/userInforSlice";
import chatbotReducer from "./features/chatbotSlice";

export default configureStore({
  reducer: {
    item: itemSlice,
    userInfor: userReducer,
    dashboardItem: dashbordItemReducer,
    chatbotMessage: chatbotReducer,
  },
});
