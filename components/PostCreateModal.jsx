import moment from "moment";
import { useEffect, useState } from "react";

// Utils
import { useForm } from "../hooks/useForm";
import { createPost } from "../utils/posts";

// Components
import Modal from "./ui/Modal";

const PostCreateModal = ({ closeModal, title }) => {
  const [validSlug, setValidSlug] = useState(true);
  const [loading, setLoading] = useState(false);

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
    if (formState.slug.match(/[^a-z_-]/g)) setValidSlug(false);
    if (!formState.slug.match(/[^a-z_-]/g)) setValidSlug(true);
  }, [formState.slug, validSlug]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    createPost({ ...formState, content: "" }).then(() => {
      setLoading(false);
      closeModal();
    });
  };

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

        <div className="h-12"></div>

        <button
          className="absolute bottom-3 right-3 bg-black text-white rounded-md py-1 px-3 disabled:bg-opacity-50"
          type="submit"
          disabled={
            !validSlug ||
            !formState.title ||
            !formState.description ||
            !formState.slug ||
            !formState.cover
          }
        >
          {loading ? "Creando..." : "Crear post"}
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
