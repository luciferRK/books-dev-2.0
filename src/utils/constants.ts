import type { Book } from "../context/types";

export const HEADINGS: {
  [key: string]: string;
} = {
  review: "Just Book Reviews and Opinions",
  discover: "N New Books to Watch out for",
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
