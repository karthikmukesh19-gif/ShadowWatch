import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex bg-gray-950 min-h-screen">

      <Sidebar />

      <div className="ml-64 flex-1">

        <Navbar />

        <div className="p-8">
          {children}
        </div>

      </div>

    </div>
  );
}

export default MainLayout;