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

export interface InitialGlobalStateType {
  allBooks: Book[];
  loading: {
    home: boolean;
    book: boolean;
  };
  imagesLoading: boolean;
  pageState: "enter" | "exit";
  book: Book;
}

export interface GlobalContextType {
  state: InitialGlobalStateType;
  dispatch: React.Dispatch<{
    type: string;
    payload?: any;
  }>;
}
