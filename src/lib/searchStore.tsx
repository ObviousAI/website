import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface SearchState {
  useComponents: boolean;
  vendor: string;
}

export const useSearchStore = create<SearchState>()(
  devtools(
    persist(
      (set) => ({
        useComponents: false,
        vendor: "All",
      }),
      {
        name: "search-storage",
      }
    )
  )
);
