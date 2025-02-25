import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the store type
type UserState = {
  name: string;
  role: string;
  setName: (name: string) => void;
  setRole: (role: string) => void;
  resetUser: () => void; // Function to reset name and role
};

// Create Zustand store with persistence
export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      name: "",
      role: "", // Default role
      setName: (name) => set({ name }),
      setRole: (role) => set({ role }),
      resetUser: () => set({ name: "", role: "" }), // Reset function
    }),
    { name: "user-storage" } // LocalStorage key
  )
);