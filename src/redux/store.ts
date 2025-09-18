import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import aiResumeReducer from "./slices/aiSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    aiResume: aiResumeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
