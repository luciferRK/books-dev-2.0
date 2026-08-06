import { useShallow } from "zustand/react/shallow";
import type { GlobalActions } from "../types";
import { useGlobalStore } from "./globalStore";

export const useAllBooks = () => useGlobalStore((s) => s.allBooks);
export const useBook = () => useGlobalStore((s) => s.book);
export const useFavBook = () => useGlobalStore((s) => s.favBook);
export const useLoading = () => useGlobalStore((s) => s.loading);
export const useImagesLoading = () => useGlobalStore((s) => s.imagesLoading);
export const usePageState = () => useGlobalStore((s) => s.pageState);
export const useIsMobileView = () => useGlobalStore((s) => s.isMobileView);
export const useGenreInfo = () => useGlobalStore((s) => s.genreInfo);

export const useGlobalActions = (): GlobalActions =>
  useGlobalStore(
    useShallow((s) => ({
      setAllBooks: s.setAllBooks,
      setLoading: s.setLoading,
      setPageState: s.setPageState,
      setImagesLoading: s.setImagesLoading,
      setBook: s.setBook,
      setFavBook: s.setFavBook,
      setMobileView: s.setMobileView,
      setGenreInfo: s.setGenreInfo,
      computeGenreInfo: s.computeGenreInfo,
      getSimilarBooks: s.getSimilarBooks,
      getBooks: s.getBooks,
    })),
  );
