export type ArticleItem = {
  title: string;
  link: string;
  img: string;
  category: string;
  new: boolean;
};

export type GistResponse = {
  articles: ArticleItem[];
};
