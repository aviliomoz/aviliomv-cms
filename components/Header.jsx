const Header = ({ title }) => {
  return (
    <header className="fixed w-full h-10 shadow-sm flex items-center px-4 z-10 bg-white">
      <span className="font-bold">{title}</span>
    </header>
  );
};

export default Header;
