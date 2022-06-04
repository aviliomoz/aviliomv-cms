import moment from "moment";
import { useEffect, useState } from "react";

// Utils
import { supabase } from "../utils/supabase";
import { getExternalPosts } from "../utils/external-posts";

// Components
import Layout from "../components/Layout";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ExternalPostCard from "../components/ExternalPostCard";
import FloatingButton from "../components/ui/FloatingButton";
import ExternalPostCreateModal from "../components/ExternalPostCreateModal";

const ExternalPostsPage = () => {
  const [posts, setPosts] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const updatePostSubscription = supabase
      .from("external_posts")
      .on("*", () => {
        getExternalPosts().then(setPosts);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(updatePostSubscription);
    };
  }, []);

  useEffect(() => {
    getExternalPosts().then(setPosts);
  }, []);

  if (!posts)
    return (
      <Layout title="Artículos externos">
        <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </Layout>
    );

  return (
    <Layout title="Artículos externos">
      <div className="w-full h-full flex flex-col">
        {posts
          .sort(
            (a, b) =>
              Number(moment(b.date, "DD/MM/YYYY")) -
              Number(moment(a.date, "DD/MM/YYYY"))
          )
          .map((post) => (
            <ExternalPostCard key={post.id} post={post} />
          ))}
      </div>
      <FloatingButton
        title={"Nuevo post externo"}
        openModal={() => setModal(true)}
      />
      {modal && (
        <ExternalPostCreateModal
          title={"Nuevo post"}
          closeModal={() => setModal(false)}
        />
      )}
    </Layout>
  );
};

export default ExternalPostsPage;
