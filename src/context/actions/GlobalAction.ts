import { useContext } from "react";
import { GlobalContext } from "..";

const useGlobalAction = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const setAllBooks = (books: any[]) => {
    dispatch({ type: "SET_ALL_BOOKS", payload: books });
  };

  const setLoadingHome = (loading: boolean) => {
    dispatch({ type: "SET_LOADING_HOME", payload: loading });
  };

  const setLoadingBook = (loading: boolean) => {
    dispatch({ type: "SET_LOADING_BOOK", payload: loading });
  };

  const setPageState = (pageState: "enter" | "exit") => {
    dispatch({ type: "SET_PAGE_STATE", payload: pageState });
  };

  const setImagesLoading = (loading: boolean) => {
    dispatch({ type: "SET_IMAGES_LOADING", payload: loading });
  };

  return {
    state,
    setAllBooks,
    setLoadingHome,
    setLoadingBook,
    setPageState,
    setImagesLoading,
  };
};

export default useGlobalAction;
