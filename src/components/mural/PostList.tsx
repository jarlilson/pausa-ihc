import ScrollArea from "../ui/ScrollArea";
import PostCard from "./PostCard";
import { usePosts } from "../../context/PostsContext";
import { usePrefs } from "../../context/PrefsContext";

export default function PostList() {
  const { posts, heart } = usePosts();
  const { reducedMotion } = usePrefs();

  return (
    <ScrollArea className="h-[calc(100vh-210px)] pr-2">
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} reducedMotion={reducedMotion} onHeart={heart} />
        ))}
      </div>
    </ScrollArea>
  );
}
