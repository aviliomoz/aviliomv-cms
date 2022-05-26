import { VscClose } from "react-icons/vsc";

const Modal = ({ children, closeModal }) => {
  return (
    <div
      onClick={closeModal}
      className="fixed w-full h-full left-0 top-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white border-[1px] border-black rounded-md shadow-md min-h-[25%] min-w-[30%] p-4"
      >
        <button onClick={closeModal} className="absolute top-2 right-2">
          <VscClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
