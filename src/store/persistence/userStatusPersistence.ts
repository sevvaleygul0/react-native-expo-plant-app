import { storage } from "@/src/storage/mmkv";
import { defaultUserStatusState } from "@/src/store/slices/userStatusSlice";
import { UserStatusState } from "@/src/store/types";

const USER_STATUS_STORAGE_KEY = "user-status";

export function loadUserStatusFromStorage(): UserStatusState {
  try {
    const rawValue = storage.getString(USER_STATUS_STORAGE_KEY);

    if (!rawValue) {
      return defaultUserStatusState;
    }

    const parsedValue = JSON.parse(rawValue) as Partial<UserStatusState>;

    return {
      onboardingCompleted: Boolean(parsedValue.onboardingCompleted),
      isSubscriber: Boolean(parsedValue.isSubscriber),
    };
  } catch {
    return defaultUserStatusState;
  }
}

export function saveUserStatusToStorage(userStatus: UserStatusState): void {
  storage.set(USER_STATUS_STORAGE_KEY, JSON.stringify(userStatus));
}
