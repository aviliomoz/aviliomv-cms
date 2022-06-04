import { useState } from "react";

// Utils
import { useForm } from "../hooks/useForm";
import { createProject } from "../utils/projects";

// Components
import Modal from "./ui/Modal";

const ProjectCreateModal = ({ closeModal, title }) => {
  const [loading, setLoading] = useState(false);

  const { formState, onInputChange } = useForm({
    title: "",
    participation: "",
    type: "",
    level: "",
    area: "",
    author: "",
    year: "",
    study_center: "",
    observation: "",
    link: "",
  });

  const inputs = [
    { label: "Título", name: "title", value: formState.title },
    {
      label: "Participación",
      name: "participation",
      value: formState.participation,
    },
    { label: "Tipo", name: "type", value: formState.type },
    { label: "Nivel", name: "level", value: formState.level },
    { label: "Area", name: "area", value: formState.area },
    { label: "Autor", name: "author", value: formState.author },
    { label: "Año", name: "year", value: formState.year },
    {
      label: "Centro de estudios",
      name: "study_center",
      value: formState.study_center,
    },
    { label: "Observación", name: "observation", value: formState.observation },
    { label: "Enlace", name: "link", value: formState.link },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    createProject({ ...formState }).then(() => {
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
            !formState.title ||
            !formState.participation ||
            !formState.type ||
            !formState.level ||
            !formState.area ||
            !formState.author ||
            !formState.year ||
            !formState.study_center
          }
        >
          {loading ? "Creando..." : "Crear proyecto"}
        </button>
      </form>
    </Modal>
  );
};

export default ProjectCreateModal;
