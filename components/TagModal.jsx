import { useState } from "react";

// Utils
import { createTag } from "../utils/tags";

// Components
import Modal from "./ui/Modal";

const TagModal = ({ closeModal, title }) => {
  const [newTagName, setNewTagName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    createTag(newTagName).then(() => closeModal());
  };

  return (
    <Modal closeModal={closeModal}>
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <form onSubmit={handleSubmit}>
        <label className="flex">
          Nombre:{" "}
          <input
            type={"text"}
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            className="border-b focus:outline-none w-full ml-2"
          />
        </label>
        <button
          className="absolute bottom-3 right-3 bg-black text-white rounded-md py-1 px-3"
          type="submit"
        >
          Guardar
        </button>
      </form>
    </Modal>
  );
};

export default TagModal;
