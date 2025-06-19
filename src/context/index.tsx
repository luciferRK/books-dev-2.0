import React from "react";
import { type GlobalContextType, type InitialGlobalStateType } from "./types";
import { SAMPLE_BOOK } from "../utils/constants";

const initialState: InitialGlobalStateType = {
  allBooks: [],
  loading: {
    home: true,
    book: true,
  },
  imagesLoading: true,
  pageState: "enter",
  book: SAMPLE_BOOK,
};

export const GlobalContext = React.createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => {},
});

const globalContextReducer = (
  state: InitialGlobalStateType,
  action: {
    type: string;
    payload?: any;
  },
) => {
  switch (action.type) {
    case "SET_ALL_BOOKS":
      return { ...state, allBooks: action.payload };
    case "SET_LOADING_HOME":
      return { ...state, loading: { ...state.loading, home: action.payload } };
    case "SET_LOADING_BOOK":
      return { ...state, loading: { ...state.loading, book: action.payload } };
    case "SET_PAGE_STATE":
      return { ...state, pageState: action.payload };
    case "SET_IMAGES_LOADING":
      return { ...state, imagesLoading: action.payload };
    default:
      return state;
  }
};

const GlobalContextProvider = (props: React.PropsWithChildren) => {
  const { children } = props;
  const [state, dispatch] = React.useReducer(
    globalContextReducer,
    initialState,
  );

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
