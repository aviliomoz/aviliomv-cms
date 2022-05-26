// Utils
import { useState } from "react";
import { updateImageName } from "../utils/images";

// Components
import Modal from "./ui/Modal";

const ImageUpdateModal = ({ closeModal, title, image }) => {
  const [imageData, setImageData] = useState({ ...image, newName: image.name });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateImageName(imageData).then(() => closeModal());
  };

  return (
    <Modal closeModal={closeModal}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">{title}</h2>

        <label className="flex">
          Nombre:{" "}
          <input
            className="border-b focus:outline-none w-full ml-2"
            type={"text"}
            value={imageData.newName}
            onChange={(e) =>
              setImageData({ ...imageData, newName: e.target.value })
            }
          />
        </label>

        <button
          className="absolute bottom-3 right-3 bg-black text-white rounded-md py-1 px-3 disabled:bg-opacity-50"
          type="submit"
        >
          Guardar
        </button>
      </form>
    </Modal>
  );
};

export default ImageUpdateModal;
