import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { createPost } from "../utils/posts";
import { getTags } from "../utils/tags";
import Modal from "./ui/Modal";

const PostCreateModal = ({ closeModal, title }) => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [validSlug, setValidSlug] = useState(true);

  const { formState, onInputChange } = useForm({
    title: "",
    description: "",
    slug: "",
    date: moment().format("DD/MM/YYYY"),
    cover: "",
  });

  const inputs = [
    { label: "Título", name: "title", value: formState.title },
    {
      label: "Descripción",
      name: "description",
      value: formState.description,
    },
    { label: "Slug", name: "slug", value: formState.slug },
    { label: "Imagen", name: "cover", value: formState.cover },
    { label: "Fecha", name: "date", value: formState.date },
  ];

  useEffect(() => {
    getTags().then((data) => {
      setTag(data[0].id);
      setTags(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (formState.slug.match(/[^a-z_-]/g)) setValidSlug(false);
    if (!formState.slug.match(/[^a-z_-]/g)) setValidSlug(true);
    console.log(validSlug);
  }, [formState.slug]);

  const handleSubmit = (e) => {
    e.preventDefault();

    createPost("", { ...formState, tag, status: false }).then(() => closeModal());
  };

  if (loading) return <></>;

  return (
    <Modal closeModal={closeModal}>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {inputs.map((input, index) => {
          return (
            <label key={index} className="flex">
              {input.label}
              {": "}
              <input
                type={"text"}
                name={input.name}
                value={input.value}
                onChange={onInputChange}
                autoComplete={"off"}
                className="border-b focus:outline-none w-full ml-2 mb-1"
              />
            </label>
          );
        })}
        <label className="flex mb-12">
          Etiqueta:{" "}
          <select
            name={"tag"}
            id="tag"
            className="border-b focus:outline-none w-full ml-2 mb-1"
            onChange={(e) => setTag(e.target.value)}
            value={tag}
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.title}
              </option>
            ))}
          </select>
        </label>
        <button
          className="absolute bottom-3 right-3 bg-black text-white rounded-md py-1 px-3 disabled:bg-opacity-50"
          type="submit"
          disabled={!validSlug}
        >
          Crear post
        </button>
      </form>
      {!validSlug && (
        <span className="absolute -bottom-28 left-0 bg-red-500 text-white p-2 rounded-md">
          El slug no puede contener caracteres especiales ni mayúsculas ni
          números
        </span>
      )}
    </Modal>
  );
};

export default PostCreateModal;
