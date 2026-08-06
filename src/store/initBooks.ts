import { getProperty, or } from "uixtra/utils";
import type { Book } from "./types";
import { useGlobalStore } from "./global/globalStore";
import { SAMPLE_BOOK } from "../utils/constants";
import { getRandomInclusive } from "../utils";

let initialized = false;

export const initBooks = async (): Promise<void> => {
  if (initialized) {
    return;
  }
  initialized = true;

  const store = useGlobalStore.getState();

  if (store.allBooks.length > 0) {
    store.setLoading(false);
    document.getElementById('main-page-loader')!.style.display = 'none';
    return;
  }

  store.setLoading(true);

  try {
    const res = await fetch("/assets/files/books.json");
    const data = await res.json();

    const allBooksFromJson = getProperty(data, ["allBooks"], []) as Book[];
    const allFavs = getProperty(data, ["favs"], []) as string[];
    const oneOfTheFav = allFavs[getRandomInclusive(0, allFavs.length - 1)];

    store.setFavBook(
      or(
        allBooksFromJson.filter((item) => item.urlName === oneOfTheFav)[0],
        SAMPLE_BOOK,
      ),
    );
    store.setAllBooks(allBooksFromJson);
    store.computeGenreInfo(allBooksFromJson);
  } catch (err) {
    console.error(err);
  } finally {
    store.setLoading(false);
    document.getElementById('main-page-loader')!.style.display = 'none';
  }
};
