import Link from "next/link";
import Image from "next/image";

const NavBarLogo = () => {
  return (
    <li className="w-full h-12 flex justify-center items-center">
      <Link href={"/"}>
        <a className="pt-2">
          <Image src="/favicon.ico" width={30} height={30} alt="logo" />
        </a>
      </Link>
    </li>
  );
};

export default NavBarLogo;
