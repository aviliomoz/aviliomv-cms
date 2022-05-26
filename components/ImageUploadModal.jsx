import { useState } from "react";
import { uploadImage } from "../utils/images";
import LoadingSpinner from "./ui/LoadingSpinner";
import Modal from "./ui/Modal";

const ImageUploadModal = ({ closeModal, title }) => {
  const [file, setFile] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    uploadImage(file).then(() => {
      setLoading(false);
      closeModal();
    });
  };

  return (
    <Modal closeModal={closeModal}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <label>
          Imagen:{" "}
          <input
            type={"file"}
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
          />
        </label>
        <button
          className="absolute bottom-3 right-3 bg-black text-white rounded-md py-1 px-3 disabled:bg-opacity-50"
          type="submit"
          disabled={file === undefined || loading}
        >
          {loading ? "Subiendo..." : "Subir imagen"}
        </button>
      </form>
    </Modal>
  );
};

export default ImageUploadModal;
