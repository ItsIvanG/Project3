import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the store type
type UserState = {
  accountId: string;
  name: string;
  role: string;
  setAccountId: (accountId: string) => void;
  setName: (name: string) => void;
  setRole: (role: string) => void;
  resetUser: () => void; // Function to reset user data
};

// Create Zustand store with persistence
export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      accountId: "",
      name: "",
      role: "", // Default role
      setAccountId: (accountId) => set({ accountId }),
      setName: (name) => set({ name }),
      setRole: (role) => set({ role }),
      resetUser: () => set({ accountId: "", name: "", role: "" }), // Reset function
    }),
    { name: "user-storage" } // LocalStorage key
  )
);
