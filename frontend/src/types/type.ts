export interface Author {
  name: string;
  email: string;
  about: string;
}

export interface BlogInterface {
  id: string;
  title: string;
  content: string;
  published: boolean;
  publishedOn: string;
  author: Author;
}

export interface BlogProps {
  title: string;
  content: string;
  publishedOn: string;
  name: string;
  id: string;
}
