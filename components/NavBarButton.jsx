const NavBarButton = ({ title, icon, action }) => {
  return (
    <li className="group w-5/6 h-10 bg-white rounded-md cursor-pointer hover:bg-red-200 flex items-center">
      <abbr className="absolute invisible min-w-max bg-transparent text-transparent py-1 px-2 rounded-md left-12 transition-all duration-300 group-hover:visible group-hover:left-16 group-hover:text-white group-hover:bg-black">
        {title}
      </abbr>
      <button
        className="w-full h-full flex justify-center items-center"
        onClick={() => action()}
      >
        {icon}
      </button>
    </li>
  );
};

export default NavBarButton;
