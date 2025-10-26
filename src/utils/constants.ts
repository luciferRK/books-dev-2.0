import type { Book, ExpandedMenuOptionValue } from "../context/types";

export const HEADINGS: {
  [key: string]: string;
} = {
  reviews: "Just Book Reviews and Opinions",
  discovery: "N New Books to Watch out for",
};

export const MOBILE_HEADINGS: {
  [key: string]: string;
} = {
  reviews: "The ones I've read",
  discovery: "Discover some new books",
};

export const SAMPLE_BOOK: Book = {
  urlName: "",
  name: "",
  image: "",
  rating: 0,
  description: [],
  review: [],
  category: "",
  genre: [],
  author: {
    name: "",
    instagram: "",
    twitter: "",
  },
  buyLinks: {
    amazon: "",
    amazonAudio: "",
  },
  dates: {
    started: "",
    finished: "",
  },
};

export const BOOK_COVER_PREFIX = "/assets/images/books/";

export const COLORS = {
  background: "#1d1d1d",
  primary: "#bc4021",
  primaryText: "#d14522",
  secondary: "#188c8c",
  white: "#ffffff",
  black: "#000000",
  offwhite: "#d9d9d9",
};

export const QUOTE_PREFIX = "quote:";

export const EXPANDED_MENU_OPTIONS: {
  [key: string]: {
    label: string;
    value: string;
    action: (cb: (value: ExpandedMenuOptionValue) => void) => void;
    phoneView: boolean;
  };
} = {
  NEW: {
    label: "NEW",
    value: "new",
    phoneView: true,
    action: (cb: (value: ExpandedMenuOptionValue) => void) => {
      cb("new");
    },
  },
  REVIEWS: {
    label: "REVIEWS",
    value: "reviews",
    phoneView: true,
    action: (cb: (value: ExpandedMenuOptionValue) => void) => {
      cb("reviews");
    },
  },
  GENRES: {
    label: "GENRES",
    value: "genres",
    phoneView: true,
    action: (cb: (value: ExpandedMenuOptionValue) => void) => {
      cb("genres");
    },
  },
  DISCOVERY: {
    label: "DISCOVERY",
    value: "discovery",
    phoneView: true,
    action: (cb: (value: ExpandedMenuOptionValue) => void) => {
      cb("discovery");
    },
  },
};
