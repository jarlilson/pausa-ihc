export type Post = {
  id: number;
  text: string;
  author: string;
  reactions: { heart: number; comments: number };
  color: string;
  time: string;
};
