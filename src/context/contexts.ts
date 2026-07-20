import React from "react";
import type {
  GlobalContextType,
  HomeContextType,
  InitialGlobalStateType,
  InitialHomeStateType,
} from "./types";
import { SAMPLE_BOOK } from "../utils/constants";

export const initialStateGlobal: InitialGlobalStateType = {
  allBooks: [],
  loading: true,
  imagesLoading: true,
  pageState: "enter",
  book: SAMPLE_BOOK,
  favBook: SAMPLE_BOOK,
  isMobileView: false,
  genreInfo: {},
};

export const GlobalContext = React.createContext<GlobalContextType>({
  state: initialStateGlobal,
  dispatch: () => {},
});

export const initialStateHome: InitialHomeStateType = {
  activePage: "reviews",
  activeGenre: "",
};

export const HomeContext = React.createContext<HomeContextType>({
  state: initialStateHome,
  dispatch: () => {},
});
