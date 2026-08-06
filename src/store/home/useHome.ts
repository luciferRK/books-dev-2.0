import React from "react";
import { useShallow } from "zustand/react/shallow";
import type { HomeActions } from "../types";
import { useHomeStore } from "./homeStore";
import { EXPANDED_MENU_OPTIONS } from "../../utils/constants";

export const useActivePage = () => useHomeStore((s) => s.activePage);
export const useActiveGenre = () => useHomeStore((s) => s.activeGenre);
export const useBookForSpider = () => useHomeStore((s) => s.bookForSpider);

export const useHomeActions = (): HomeActions =>
  useHomeStore(
    useShallow((s) => ({
      setActivePage: s.setActivePage,
      setActiveGenre: s.setActiveGenre,
      setBookForSpider: s.setBookForSpider,
    })),
  );

export interface MenuOption {
  key: string;
  isSelected: boolean;
  label: string;
  showPhone: boolean;
  onClick: () => void;
}

/**
 * Builds the expanded-menu options. Subscribes only to `activePage`, so it
 * recomputes (and re-renders its consumer) exclusively when the active page
 * changes.
 */
export const useMenuOptions = (): MenuOption[] => {
  const activePage = useActivePage();
  const setActivePage = useHomeStore((s) => s.setActivePage);

  return React.useMemo(
    () =>
      Object.keys(EXPANDED_MENU_OPTIONS).map((key) => ({
        key: EXPANDED_MENU_OPTIONS[key].value,
        isSelected: activePage === EXPANDED_MENU_OPTIONS[key].value,
        label: EXPANDED_MENU_OPTIONS[key].label,
        showPhone: EXPANDED_MENU_OPTIONS[key].phoneView,
        onClick: () => {
          EXPANDED_MENU_OPTIONS[key].action((value) => {
            setActivePage(value);
          });
        },
      })),
    [activePage, setActivePage],
  );
};
