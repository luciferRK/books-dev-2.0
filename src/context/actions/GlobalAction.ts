import { useContext, useEffect } from "react";
import { GlobalContext } from "..";
import type { Book } from "../types";

const useGlobalAction = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const setAllBooks = (books: any[]) => {
    dispatch({ type: "SET_ALL_BOOKS", payload: books });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setPageState = (pageState: "enter" | "exit" | "idle") => {
    dispatch({ type: "SET_PAGE_STATE", payload: pageState });
  };

  const setImagesLoading = (loading: boolean) => {
    dispatch({ type: "SET_IMAGES_LOADING", payload: loading });
  };

  const setBook = (book: Book) => {
    dispatch({ type: "SET_BOOK", payload: book });
  };

  useEffect(() => {
    if (state.allBooks.length === 0) {
      setLoading(true);
      fetch("/files/books.json")
        .then((res) => res.json())
        .then((data) => {
          setAllBooks(data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setLoading(false);
    }
  }, [state.allBooks]);

  return {
    state,
    setAllBooks,
    setLoading,
    setPageState,
    setImagesLoading,
    setBook,
  };
};

export default useGlobalAction;
