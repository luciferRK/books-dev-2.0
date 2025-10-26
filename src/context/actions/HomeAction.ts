import React from "react";
import { HomeContext } from "../contexts";
import type { ExpandedMenuOptionValue } from "../types";
import { EXPANDED_MENU_OPTIONS } from "../../utils/constants";

const useHomeAction = () => {
  const { state: homeState, dispatch } = React.useContext(HomeContext);

  const { activePage } = homeState;

  const setActivePage = React.useCallback(
    (value: ExpandedMenuOptionValue) => {
      dispatch({
        type: "SET_ACTIVE_PAGE",
        payload: value,
      });
    },
    [dispatch],
  );

  const MenuOptions: Array<{
    key: string;
    isSelected: boolean;
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }> = React.useMemo(
    () =>
      Object.keys(EXPANDED_MENU_OPTIONS).map((key) => ({
        key: EXPANDED_MENU_OPTIONS[key].value,
        isSelected: activePage === EXPANDED_MENU_OPTIONS[key].value,
        label: EXPANDED_MENU_OPTIONS[key].label,
        showPhone: EXPANDED_MENU_OPTIONS[key].phoneView,
        onClick: (e) => {
          e.preventDefault();
          EXPANDED_MENU_OPTIONS[key].action((value) => {
            setActivePage(value);
          });
        },
      })),
    [activePage, setActivePage],
  );

  return {
    homeState,
    MenuOptions,
  };
};

export default useHomeAction;
