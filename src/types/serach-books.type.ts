export type SearchBookReq = {
  query: string;
  sort?: string;
  page?: number;
  size?: number;
  target?: string;
};

export type SearchBookRes = {
  authors: string[];
  contents: string;
  datetime: Date;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
};

export type DetailSearchBookReq = {
  query: string;
  title?: string;
  person?: number;
  publisher?: string;
  isbn?: string;
};
