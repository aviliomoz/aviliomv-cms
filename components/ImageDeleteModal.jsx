import { deleteImage } from "../utils/images";
import Modal from "./ui/Modal";

const ImageDeleteModal = ({ closeModal, title, image }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    deleteImage(image).then(() => closeModal());
  };

  return (
    <Modal closeModal={closeModal}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p>
          ¿Estas seguro que quieres eliminar la imagen:{" "}
          <span>{image.name}</span>?
        </p>
        <button
          className="absolute bottom-3 right-3 bg-black text-white rounded-md py-1 px-3 disabled:bg-opacity-50"
          type="submit"
        >
          Eliminar
        </button>
      </form>
    </Modal>
  );
};

export default ImageDeleteModal;
