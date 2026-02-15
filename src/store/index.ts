import { configureStore } from "@reduxjs/toolkit";

import {
  loadUserStatusFromStorage,
  saveUserStatusToStorage,
} from "@/src/store/persistence/userStatusPersistence";
import userStatusReducer from "@/src/store/slices/userStatusSlice";

const preloadedUserStatus = loadUserStatusFromStorage();

export const store = configureStore({
  reducer: {
    userStatus: userStatusReducer,
  },
  preloadedState: {
    userStatus: preloadedUserStatus,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveUserStatusToStorage(state.userStatus);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
