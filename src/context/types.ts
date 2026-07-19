export type ExpandedMenuOptionValue =
  | "chronicle"
  | "reviews"
  | "genres"
  | "discovery";

export interface Book {
  urlName: string;
  name: string;
  image: string;
  rating: number;
  description: Array<string>;
  review: Array<string>;
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
    peakYear: number | null,
    avgRating: number,
    books: Book[];
  }
}

export interface InitialGlobalStateType {
  allBooks: Book[];
  loading: boolean;
  imagesLoading: boolean;
  pageState: "enter" | "exit" | "idle";
  book: Book;
  favBook: Book;
  isMobileView: boolean;
  genreInfo: GenreType;
}

export interface GlobalContextType {
  state: InitialGlobalStateType;
  dispatch: React.Dispatch<{
    type: string;
    payload?: any;
  }>;
}

export interface InitialHomeStateType {
  activePage: ExpandedMenuOptionValue;
}

export interface HomeContextType {
  state: InitialHomeStateType;
  dispatch: React.Dispatch<{
    type: string;
    payload?: any;
  }>;
}
