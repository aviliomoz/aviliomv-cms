import Header from "./Header";
import NavBar from "./NavBar";

const Layout = ({ children, title }) => {
  return (
    <div className="w-full h-screen">
      <NavBar />
      <div className="w-[calc(100vw-64px)] pl-[64px]">
        <Header title={title} />
        <main className="relative pt-14 p-4 min-h-[calc(100vh-40px)] w-[calc(100vw-64px-16px-10px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
