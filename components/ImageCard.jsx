import Image from "next/image";
import { useEffect, useState } from "react";

// Utils
import { getImageURL } from "../utils/images";

// Components
import DropdownMenu from "./ui/DropdownMenu";

// Icons
import { VscKebabVertical } from "react-icons/vsc";
import LoadingSpinner from "./ui/LoadingSpinner";

const ImageCard = ({
  image,
  openModal,
  setImageToDelete,
  setImageToUpdate,
}) => {
  const [menu, setMenu] = useState(false);

  const handleDelete = () => {
    setImageToDelete(image);
    openModal("delete");
  };

  const handleUpdate = () => {
    setImageToUpdate(image);
    openModal("update");
  };

  return (
    <article className="relative group shadow-md rounded-md p-3 border-[1px] border-black h-56 mr-4 mb-4 w-[calc((100%-80px)/5)]">
      <div className="h-4/6 w-full bg-slate-200 flex justify-center items-center rounded-md overflow-hidden">
        <picture className="relative h-full w-full cursor-pointer">
          <LoadingSpinner />
          <Image src={getImageURL(image.name)} layout="fill" />
        </picture>
      </div>
      <div className=" h-2/6 w-full flex items-center justify-center text-center">
        <abbr className="no-underline w-full truncate" title={image.name}>
          {image.name}
        </abbr>
      </div>
      <button
        onClick={() => setMenu(!menu)}
        className="absolute bottom-4 right-4 invisible group-hover:visible"
      >
        <VscKebabVertical />
      </button>
      {menu && (
        <DropdownMenu
          closeMenu={() => setMenu(false)}
          elements={[
            { text: "Renombrar", action: () => handleUpdate() },
            { text: "Eliminar", action: () => handleDelete() },
          ]}
        />
      )}
    </article>
  );
};

export default ImageCard;
