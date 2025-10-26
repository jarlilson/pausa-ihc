import PostList from "../components/mural/PostList";

export default function HomePage() {
  return (
    <main className="flex-1 max-w-md mx-auto w-full px-4 pb-28 pt-4">
      <h2 className="text-[#2e4848] text-center mb-1">Mural de Desabafos</h2>
      <p className="text-[#2e4848]/70 text-center mb-6">Compartilhe seus pensamentos de forma anônima e acolhedora</p>
      <PostList />
    </main>
  );
}
