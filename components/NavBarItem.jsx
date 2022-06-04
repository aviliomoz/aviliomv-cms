import Link from "next/link";

const NavBarItem = ({ title, route, icon }) => {
  return (
    <li className="group w-5/6 h-10 bg-white rounded-md cursor-pointer hover:bg-gray-100 flex items-center">
      <abbr className="absolute min-w-max invisible bg-transparent text-transparent py-1 px-2 rounded-md left-12 transition-all duration-300 group-hover:visible group-hover:left-16 group-hover:text-white group-hover:bg-black">
        {title}
      </abbr>
      <Link href={route}>
        <a className="w-full h-full flex justify-center items-center">{icon}</a>
      </Link>
    </li>
  );
};

export default NavBarItem;
