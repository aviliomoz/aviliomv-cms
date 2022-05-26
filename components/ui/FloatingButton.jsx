import { VscAdd } from "react-icons/vsc";

const FloatingButton = ({ title, openModal }) => {
  return (
    <button
      onClick={openModal}
      className="group fixed bottom-10 right-10 flex items-center bg-black p-3 rounded-full"
    >
      <span className="absolute right-11 text-center min-w-max py-1 px-3 transition-all duration-300 bg-transparent text-transparent rounded-md invisible group-hover:visible group-hover:right-12 group-hover:bg-black group-hover:text-white">
        {title}
      </span>
      <VscAdd className="fill-white stroke-white stroke-1" />
    </button>
  );
};

export default FloatingButton;
