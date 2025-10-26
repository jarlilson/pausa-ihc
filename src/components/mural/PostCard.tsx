import { motion } from "motion/react";
import { Heart, MessageCircle } from "lucide-react";
import { Post } from "../../types/post";

export default function PostCard({
  post, reducedMotion, onHeart,
}: {
  post: Post;
  reducedMotion: boolean;
  onHeart: (id: number) => void;
}) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
      animate={reducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="rounded-sm shadow-md p-4"
      style={{ backgroundColor: post.color }}
      aria-label={`Desabafo ${post.id}`}
    >
      <p className="text-[#2e4848] mb-3 whitespace-pre-wrap">{post.text}</p>
      <div className="flex items-center justify-between text-sm text-[#2e4848]/70">
        <span>por {post.author} · {post.time}</span>
        <div className="flex gap-4" aria-label="Reações">
          <button className="inline-flex items-center gap-1" aria-label="Apoiar" onClick={() => onHeart(post.id)}>
            <Heart className="h-4 w-4" /> {post.reactions.heart}
          </button>
          <span className="inline-flex items-center gap-1" aria-label="Comentários">
            <MessageCircle className="h-4 w-4" /> {post.reactions.comments}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
