import SideList from "./SideList";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div >
      
      <main className="main-container">
      <div class="sizes">
        <SideList className="sidebar"/>
        
        <Outlet />
       
        </div>
      </main>
    </div>
  );
};

export default Layout;