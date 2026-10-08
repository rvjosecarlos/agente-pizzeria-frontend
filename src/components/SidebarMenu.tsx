import { Link, useLocation } from "react-router-dom";

export default function SidebarMenu(){
    const location = useLocation(); 
    const pathname = location.pathname;

    return (
        <section className="w-56 shrink-0 bg-gray-900 h-screen text-white fixed">
            <h1 className="p-4 text-amber-50 text-center font-semibold text-2xl w-full">Pizzería Admin</h1>
            <nav className="py-4">
                <ul className="px-4 space-y-2">
                    <li>
                        <Link 
                            to={"/"}
                            className={`w-full p-3 font-semibold block rounded-lg ${ pathname === "/" ? "bg-orange-700 text-white" : "" }`}
                        >
                                Pedidos
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={"/items"}
                            className={`w-full p-3 font-semibold block rounded-lg ${ pathname === "/items" ? "bg-orange-700 text-amber-50" : "" }`}
                        >
                                Items
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={"/clients"}
                            className={`w-full p-3 font-semibold block rounded-lg ${ pathname === "/clients" ? "bg-orange-700 text-amber-50" : "" }`}
                        >
                                Clientes
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    )
};