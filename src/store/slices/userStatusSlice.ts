import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserStatusState } from "@/src/store/types";

export const defaultUserStatusState: UserStatusState = {
  onboardingCompleted: false,
  isSubscriber: false,
};

const userStatusSlice = createSlice({
  name: "userStatus",
  initialState: defaultUserStatusState,
  reducers: {
    hydrateUserStatus: (_, action: PayloadAction<UserStatusState>) =>
      action.payload,
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.onboardingCompleted = action.payload;
    },
    setIsSubscriber: (state, action: PayloadAction<boolean>) => {
      state.isSubscriber = action.payload;
    },
    resetUserStatus: () => defaultUserStatusState,
  },
});

export const {
  hydrateUserStatus,
  setOnboardingCompleted,
  setIsSubscriber,
  resetUserStatus,
} = userStatusSlice.actions;

export default userStatusSlice.reducer;
