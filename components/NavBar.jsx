import { useRouter } from "next/router";

import NavBarItem from "./NavbarItem";
import NavBarLogo from "./NavBarLogo";
import NavBarButton from "./NavBarButton";

// Icons
import { VscFiles, VscTag, VscSignOut, VscDeviceCamera } from "react-icons/vsc";
import { supabase } from "../utils/supabase";

// Items
const items = [
  {
    title: "Artículos",
    route: "/posts",
    icon: <VscFiles className="navbar-icon" />,
  },
  {
    title: "Imágenes",
    route: "/images",
    icon: <VscDeviceCamera className="navbar-icon" />,
  },
  {
    title: "Etiquetas",
    route: "/tags",
    icon: <VscTag className="navbar-icon" />,
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
