import { useRouter } from "next/router";

import NavBarItem from "./NavBarItem";
import NavBarLogo from "./NavBarLogo";
import NavBarButton from "./NavBarButton";

// Icons
import {
  VscFiles,
  VscSignOut,
  VscDeviceCamera,
  VscGlobe,
  VscExtensions,
} from "react-icons/vsc";
import { supabase } from "../utils/supabase";

// Items
const items = [
  {
    title: "Artículos",
    route: "/posts",
    icon: <VscFiles className="navbar-icon" />,
  },
  {
    title: "Artículos externos",
    route: "/external-posts",
    icon: <VscGlobe className="navbar-icon" />,
  },
  {
    title: "Proyectos",
    route: "/projects",
    icon: <VscExtensions className="navbar-icon" />,
  },
  {
    title: "Imágenes",
    route: "/images",
    icon: <VscDeviceCamera className="navbar-icon" />,
  },
];

const NavBar = () => {
  const router = useRouter();

  return (
    <nav className="fixed w-16 h-full flex flex-col justify-between bg-white p-1 z-20 shadow-sm">
      <ul className="w-full flex flex-col items-center space-y-1">
        <NavBarLogo />
        <hr className="w-5/6" />
        {items.map((item, index) => (
          <NavBarItem
            key={index}
            title={item.title}
            route={item.route}
            icon={item.icon}
          />
        ))}
      </ul>
      <ul className="w-full flex flex-col items-center space-y-1">
        <hr className="w-5/6" />
        <NavBarButton
          title={"Cerrar sesión"}
          icon={<VscSignOut className="navbar-icon" />}
          action={() =>
            supabase.auth.signOut().then(() => router.push("/login"))
          }
        />
      </ul>
    </nav>
  );
};

export default NavBar;
