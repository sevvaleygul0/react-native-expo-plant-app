export type UserStatusState = {
  onboardingCompleted: boolean;
  isSubscriber: boolean;
};

export type RootState = {
  userStatus: UserStatusState;
};
