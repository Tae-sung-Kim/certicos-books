export type SearchBookReq = {
  query: string;
  sort?: string;
  page?: number;
  size?: number;
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
