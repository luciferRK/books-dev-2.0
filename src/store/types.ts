export type ExpandedMenuOptionValue =
  | "chronicle"
  | "reviews"
  | "genres"
  | "discovery";

export type PageState = "enter" | "exit" | "idle";

export interface Book {
  urlName: string;
  name: string;
  image: string;
  rating: number;
  description: Array<string>;
  review: Array<string>;
  literaryValues: {
    action: number;
    contemplative: number;
    dark: number;
    light: number;
    plot: number;
    characters: number;
    pacing: number;
    prose: number;
    world: number;
    emotion: number;
  };
  category: string;
  genre: Array<string>;
  author: {
    name: string;
    instagram: string;
    twitter: string;
  };
  buyLinks: {
    amazon: string;
    amazonAudio: string;
  };
  dates: {
    started: string;
    finished: string;
  };
}

export interface GenreType {
  [key: string]: {
    peakYear: number | null;
    avgRating: number;
    books: Book[];
  };
}

export interface GlobalState {
  allBooks: Book[];
  loading: boolean;
  imagesLoading: boolean;
  pageState: PageState;
  book: Book;
  favBook: Book;
  isMobileView: boolean;
  genreInfo: GenreType;
}

export interface GlobalActions {
  setAllBooks: (books: Book[]) => void;
  setLoading: (loading: boolean) => void;
  setPageState: (pageState: PageState) => void;
  setImagesLoading: (loading: boolean) => void;
  setBook: (book: Book) => void;
  setFavBook: (book: Book) => void;
  setMobileView: (value: boolean) => void;
  setGenreInfo: (value: GenreType) => void;
  computeGenreInfo: (books?: Book[]) => void;
  getSimilarBooks: (book: Book) => Book[];
  getBooks: (
    homeSection: ExpandedMenuOptionValue | "all",
    genreName?: string,
  ) => Book[];
}

export type GlobalStore = GlobalState & GlobalActions;

export interface HomeState {
  activePage: ExpandedMenuOptionValue;
  activeGenre: string;
  bookForSpider?: Book;
}

export interface HomeActions {
  setActivePage: (value: ExpandedMenuOptionValue) => void;
  setActiveGenre: (value: string) => void;
  setBookForSpider: (value: Book) => void;
}

export type HomeStore = HomeState & HomeActions;
