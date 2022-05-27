import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// Utils
import { useAutosave } from "../../hooks/useAutosave";
import { getPostData, getPosts, updatePost } from "../../utils/posts";
import { getTags } from "../../utils/tags";
import { ReactMarkdownConfig } from "../../utils/markdown";

// Components
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const PostEditorPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  const {
    data: post,
    setData: setPost,
    updated,
  } = useAutosave({ name: "", data: {}, content: "" }, updatePost, 4000);

  const handleChangeOnMetadata = (e) => {
    setPost({
      ...post,
      data: { ...post.data, [e.target.name]: e.target.value },
    });
  };

  const handleChangeTag = (e) => {
    setPost({
      ...post,
      data: { ...post.data, tag: e.target.value },
    });
  };

  const handleChangeStatus = (e) => {
    setPost({
      ...post,
      data: { ...post.data, status: e.target.checked },
    });
  };

  const handleChangeContent = (e) => {
    setPost({
      ...post,
      content: e.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      getPosts()
        .then((data) => data.filter((post) => post.id === id))
        .then((post) => getPostData(post[0].name))
        .then((markdown) => {
          setPost({
            name: `${markdown.metadata.slug}.md`,
            data: {
              title: markdown.metadata.title,
              description: markdown.metadata.description,
              slug: markdown.metadata.slug,
              cover: markdown.metadata.cover,
              date: markdown.metadata.date,
              tag: markdown.metadata.tag,
              status: markdown.metadata.status,
            },
            content: markdown.content,
          });

          getTags().then(setTags);

          setLoading(false);
        });
    }
  }, [id, setPost]);

  if (loading)
    return (
      <Layout title={"Artículos > Editor"}>
        <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </Layout>
    );

  return (
    <Layout title={"Artículos > Editor"}>
      <div className="w-full">
        <div className="flex justify-between items-center h-10 w-full border-[1px] border-black rounded-md p-2 mb-2">
          <label className="flex w-full font-semibold">
            Título:{" "}
            <input
              type="text"
              value={post.data.title}
              name="title"
              onChange={handleChangeOnMetadata}
              className="font-bold w-full outline-none ml-2"
            />
          </label>
          <div className="flex min-w-max">
            {updated ? (
              <span className="text-opacity-50">Actualizado</span>
            ) : (
              <span>Cambios sin guardar...</span>
            )}
            <label className="ml-4">
              <input
                type={"checkbox"}
                checked={post.data.status}
                onChange={handleChangeStatus}
                className="mr-2"
              />
              {post.data.status ? "Activo" : "Oculto"}
            </label>
          </div>
        </div>
        <div className="w-full flex space-x-2">
          <section className="w-2/12 h-[calc(100vh-140px)] border-[1px] border-black shadow-md rounded-md overflow-hidden p-2">
            <label className="font-semibold">
              Descripción:{" "}
              <textarea
                type="text"
                value={post.data.description}
                name="description"
                onChange={handleChangeOnMetadata}
                className="mb-2 w-full resize-none min-h-[120px] border-[1px] rounded-md p-1 outline-none"
              />
            </label>
            <label className="font-semibold">
              Slug:{" "}
              <input
                type="text"
                value={post.data.slug}
                name="slug"
                onChange={handleChangeOnMetadata}
                disabled
                className="mb-2 w-full border-[1px] rounded-md p-1 outline-none"
              />
            </label>
            <label className="font-semibold">
              Imagen:{" "}
              <input
                type="text"
                value={post.data.cover}
                name="cover"
                onChange={handleChangeOnMetadata}
                className="mb-2 w-full border-[1px] rounded-md p-1 outline-none"
              />
            </label>
            <label className="font-semibold">
              Fecha:{" "}
              <input
                type="text"
                value={post.data.date}
                name="date"
                onChange={handleChangeOnMetadata}
                className="mb-2 w-full border-[1px] rounded-md p-1 outline-none"
              />
            </label>
            <label className="font-semibold">
              Etiqueta:{" "}
              <select
                onChange={handleChangeTag}
                value={post.data.tag}
                className="mb-2 w-full border-[1px] rounded-md p-1 outline-none"
              >
                {tags.map((tag) => {
                  return (
                    <option key={tag.id} value={tag.id}>
                      {tag.title}
                    </option>
                  );
                })}
              </select>
            </label>
          </section>
          <section className="w-5/12 h-[calc(100vh-140px)] border-[1px] border-black shadow-md rounded-md overflow-hidden">
            <textarea
              value={post.content}
              onChange={handleChangeContent}
              className="resize-none w-full min-h-full outline-none p-2"
            />
          </section>
          <section className="w-5/12 prose h-[calc(100vh-140px)] border-[1px] border-black shadow-md rounded-md overflow-hidden">
            <ReactMarkdown
              components={ReactMarkdownConfig}
              className="w-full max-h-full p-2 overflow-y-scroll"
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {post.content}
            </ReactMarkdown>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PostEditorPage;
