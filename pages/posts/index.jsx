import { useEffect, useState } from "react";

// Utils
import { getPosts } from "../../utils/posts";

// Components
import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";
import FloatingButton from "../../components/ui/FloatingButton";
import PostCreateModal from "../../components/PostCreateModal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const PostsPage = () => {
  const [posts, setPosts] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  if (!posts)
    return (
      <Layout title={"Artículos"}>
        <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </Layout>
    );

  return (
    <Layout title={"Artículos"}>
      <div className="w-full flex flex-col">
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </div>
      <FloatingButton title={"Nuevo post"} openModal={() => setModal(true)} />
      {modal && (
        <PostCreateModal
          title={"Nuevo post"}
          closeModal={() => setModal(false)}
        />
      )}
    </Layout>
  );
};

export default PostsPage;
