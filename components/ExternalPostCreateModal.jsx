import moment from "moment";
import { useState } from "react";

// Utils
import { useForm } from "../hooks/useForm";
import { createExternalPost } from "../utils/external-posts";

// Components
import Modal from "./ui/Modal";

const ExternalPostCreateModal = ({ closeModal, title }) => {
  const [loading, setLoading] = useState(false);

  const { formState, onInputChange } = useForm({
    title: "",
    url: "",
    date: moment().format("DD/MM/YYYY"),
  });

  const inputs = [
    { label: "Título", name: "title", value: formState.title },
    { label: "Enlace", name: "url", value: formState.url },
    { label: "Fecha", name: "date", value: formState.date },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    createExternalPost({ ...formState }).then(() => {
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
          disabled={!formState.title || !formState.url || !formState.date}
        >
          {loading ? "Creando..." : "Crear post"}
        </button>
      </form>
    </Modal>
  );
};

export default ExternalPostCreateModal;
