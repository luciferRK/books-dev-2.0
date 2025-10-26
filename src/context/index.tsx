import React from "react";
import { type InitialGlobalStateType } from "./types";
import { GlobalContext, initialStateGlobal } from "./contexts";

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
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_PAGE_STATE":
      return { ...state, pageState: action.payload };
    case "SET_IMAGES_LOADING":
      return { ...state, imagesLoading: action.payload };
    case "SET_BOOK":
      return { ...state, book: action.payload };
    case "SET_FAV_BOOK":
      return { ...state, favBook: action.payload };
    case "SET_MOBILE_VIEW":
      return { ...state, isMobileView: action.payload };
    default:
      return state;
  }
};

const GlobalContextProvider = (props: React.PropsWithChildren) => {
  const { children } = props;
  const [state, dispatch] = React.useReducer(
    globalContextReducer,
    initialStateGlobal,
  );

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
