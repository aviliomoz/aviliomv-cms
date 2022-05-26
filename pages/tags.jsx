import { useEffect, useState } from "react";

// Utils
import { supabase } from "../utils/supabase";
import { getTags } from "../utils/tags";

// Components
import Layout from "../components/Layout";
import TagCard from "../components/TagCard";
import FloatingButton from "../components/ui/FloatingButton";
import TagModal from "../components/TagModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const TagsPage = () => {
  const [tags, setTags] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getTags().then((tags) => setTags(tags));
  }, []);

  useEffect(() => {
    if (tags) {
      const onTagUpdate = supabase
        .from("tags")
        .on("*", () => {
          getTags().then((tags) => setTags(tags));
        })
        .subscribe();

      return () => {
        onTagUpdate.unsubscribe();
      };
    }
  }, [tags]);

  if (!tags)
    return (
      <Layout title={"Etiquetas"}>
        <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </Layout>
    );

  return (
    <Layout title={"Etiquetas"}>
      <div className="w-full flex flex-wrap">
        {tags.map((tag) => (
          <TagCard key={tag.id} tag={tag} />
        ))}
      </div>
      <FloatingButton
        title={"Nueva etiqueta"}
        openModal={() => setModal(true)}
      />
      {modal && (
        <TagModal title={"Nueva etiqueta"} closeModal={() => setModal(false)} />
      )}
    </Layout>
  );
};

export default TagsPage;
