import { createContext, useContext, ReactNode, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Post } from "../types/post";
import { newId } from "../services/id";
import { colorFromSeed } from "../services/colors";
import { nowIso, prettySince } from "../services/time";

type PostsCtx = {
  posts: Post[];
  addPost: (content: string, anonymous: boolean) => void;
  heart: (id: number) => void;
};

const PostsContext = createContext<PostsCtx | null>(null);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useLocalStorage<Post[]>("pausa.posts", [
    { id: 1, text: "Às vezes só preciso de um momento para respirar e organizar meus pensamentos...", author: "Anônimo", reactions: { heart: 12, comments: 3 }, color: "#B0EAF7", time: "há 1h" },
    { id: 2, text: "A pressão da universidade é real, mas estou tentando ir um dia de cada vez.", author: "Maria Luiza", reactions: { heart: 8, comments: 2 }, color: "#F7B0EA", time: "há 2h" },
    { id: 3, text: "Não estou sozinho nisso. Todos estamos lutando nossas próprias batalhas.", author: "Anônimo", reactions: { heart: 15, comments: 5 }, color: "#EAF7B0", time: "há 3h" },
  ]);

  const api = useMemo<PostsCtx>(() => ({
    posts,
    addPost: (content, anonymous) => {
      const author = anonymous ? "Anônimo" : "Você";
      const createdAt = nowIso();
      const p: Post = {
        id: newId(),
        text: content,
        author,
        reactions: { heart: 0, comments: 0 },
        color: colorFromSeed(createdAt + author),
        time: prettySince(createdAt),
        // dica opcional: createdAt, se você adicionar isso no tipo
      };
      setPosts(prev => [p, ...prev]); // atualização funcional
    },
    heart: (id) => {
      setPosts(prev =>
        prev.map(p => p.id === id
          ? { ...p, reactions: { ...p.reactions, heart: p.reactions.heart + 1 } }
          : p
        )
      );
    },
  }), [posts]); // setPosts é estável, não precisa aqui

  return <PostsContext.Provider value={api}>{children}</PostsContext.Provider>;
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts deve ser usado dentro de <PostsProvider>");
  return ctx;
}
