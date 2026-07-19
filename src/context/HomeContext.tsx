import React from "react";
import { type InitialHomeStateType } from "./types";
import { HomeContext, initialStateHome } from "./contexts";

const homeContextReducer = (
  state: InitialHomeStateType,
  action: {
    type: string;
    payload?: any;
  },
) => {
  switch (action.type) {
    case "SET_ACTIVE_PAGE":
      return { ...state, activePage: action.payload };
    default:
      return state;
  }
};

const HomeContextProvider = (props: React.PropsWithChildren) => {
  const { children } = props;
  const [state, dispatch] = React.useReducer(
    homeContextReducer,
    initialStateHome,
  );

  return (
    <HomeContext.Provider value={{ state, dispatch }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
