import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import OrdenesPage from "./pages/OrdenesPage";
import CrearPedidoPage from "./pages/CrearPedidoPage";
import ItemsPage from "./pages/ItemsPage";
import ClientsPage from "./pages/ClientsPage";


export default function Router(){
    return(
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="/" element={<OrdenesPage />}/>
                <Route path="/crear-pedido" element={<CrearPedidoPage />} />
                <Route path="/items" element={<ItemsPage />} />
                <Route path="/clients" element={<ClientsPage />} />
            </Route>
        </Routes>
    )
};