import { Outlet } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";

export default function AdminLayout(){
    return(
        <div className="bg-amber-50">
            <SidebarMenu />
            <Outlet />
        </div>
    )
}