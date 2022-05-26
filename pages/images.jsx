import { useEffect, useState } from "react";

// Utils
import { getImages } from "../utils/images";

// Components
import Layout from "../components/Layout";
import ImageCard from "../components/ImageCard";
import FloatingButton from "../components/ui/FloatingButton";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ImageUploadModal from "../components/ImageUploadModal";
import ImageDeleteModal from "../components/ImageDeleteModal";
import ImageUpdateModal from "../components/ImageUpdateModal";

const ImagesPage = () => {
  const [images, setImages] = useState(null);
  const [modal, setModal] = useState(null); // upload - update - delete - null
  const [imageToDelete, setImageToDelete] = useState(null);
  const [imageToUpdate, setImageToUpdate] = useState(null);

  useEffect(() => {
    getImages().then(setImages);
  }, []);

  if (!images)
    return (
      <Layout title={"Imágenes"}>
        <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </Layout>
    );

  return (
    <Layout title={"Imágenes"}>
      <div className="w-full h-full flex flex-wrap">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            openModal={(mode) => setModal(mode)}
            setImageToDelete={setImageToDelete}
            setImageToUpdate={setImageToUpdate}
          />
        ))}
      </div>
      <FloatingButton
        title={"Nueva imagen"}
        openModal={() => setModal("upload")}
      />
      {modal === "upload" && (
        <ImageUploadModal
          closeModal={() => {
            setModal(null);
            getImages().then(setImages);
          }}
          title={"Nueva imagen"}
        />
      )}
      {modal === "update" && (
        <ImageUpdateModal
          closeModal={() => {
            setModal(null);
            getImages().then(setImages);
          }}
          title="Editar nombre de la imagen"
          image={imageToUpdate}
        />
      )}
      {modal === "delete" && (
        <ImageDeleteModal
          closeModal={() => {
            setModal(null);
            getImages().then(setImages);
          }}
          title="Eliminar imagen"
          image={imageToDelete}
        />
      )}
    </Layout>
  );
};

export default ImagesPage;
