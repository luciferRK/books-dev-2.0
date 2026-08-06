import { create } from "zustand";
import type { HomeStore } from "../types";

export const useHomeStore = create<HomeStore>((set) => ({
  activePage: "reviews",
  activeGenre: "",
  bookForSpider: undefined,

  setActivePage: (activePage) => set({ activePage }),
  setActiveGenre: (activeGenre) => set({ activeGenre }),
  setBookForSpider: (bookForSpider) => set({ bookForSpider }),
}));
