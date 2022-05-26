import { useEffect, useRef, useState } from "react";

const DropdownMenu = ({ closeMenu, elements }) => {
  const menu = useRef();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const checkOutsideClick = (e) => {
      if (loaded && menu.current && !menu.current.contains(e.target))
        closeMenu();
    };

    window.addEventListener("click", checkOutsideClick);

    return () => {
      window.removeEventListener("click", checkOutsideClick);
    };
  }, [loaded, closeMenu]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  return (
    <menu
      ref={menu}
      className="border z-10 border-black rounded-md bg-white overflow-hidden w-28 absolute -right-[100px] bottom-1 p-2"
    >
      <ul className="flex flex-col justify-around">
        {elements.map((element, index) => {
          return (
            <li
              className="w-full hover:font-semibold cursor-pointer"
              key={index}
              onClick={() => {
                element.action();
                closeMenu();
              }}
            >
              {element.text}
            </li>
          );
        })}
      </ul>
    </menu>
  );
};

export default DropdownMenu;
