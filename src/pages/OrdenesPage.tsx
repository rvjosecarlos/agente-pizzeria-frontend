import CardResume from "../components/CardResume";
import CardPedido from "../components/CardPedido";
import TopTitleBar from "../components/TopTitleBar";
import StandarButton from "../components/StandarButton";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/ordersAPI";
import type z from "zod";
import type { OrderSchema } from "../types";

export type OrderType = z.infer<typeof OrderSchema>;

const cardsResume = ["Pedidos activos", "Ventas del día", "Ticket promedio", "Cancelados hoy"]

export default function OrdenesPage(){
    const navigate = useNavigate();
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["ordenes"],
        queryFn: getOrders,
        refetchInterval: 10000
    });

    if(isPending) return <div className="ml-56 h-screen flex justify-center items-center"><MoonLoader color="#36d7b7"/></div>;
    if(isError) return <div className="ml-56 h-screen flex justify-center items-center"><p>{error.message}</p></div>

    let ordenesClasificadas: { nuevo: OrderType[], preparando: OrderType[], enviado: OrderType[], completado: OrderType[], cancelado: OrderType[] } = {
        nuevo: [],
        preparando: [],
        enviado: [],
        completado: [],
        cancelado: []
    };
    data.forEach( orden => {
        ordenesClasificadas[orden.estado] = [...ordenesClasificadas[orden.estado], orden];
    });

    console.log({ ordenesClasificadas });
    if(ordenesClasificadas) return (
        <div className="p-10 ml-56">
            <TopTitleBar title="Pedidos" description={`${formatDate(new Date())} - Actualizado hace 8s`}>
                <StandarButton 
                    color="white" 
                    name="Agregar item" 
                    className="w-40 rounded-lg"
                    onClick={()=>navigate("/items")}
                />
                <StandarButton 
                    color="orange" 
                    name="Simular pedido" 
                    className="w-40 rounded-lg"
                    onClick={()=> navigate("/crear-pedido")}
                />
            </TopTitleBar>
            <section className="flex mt-10 space-x-4">
                {
                    cardsResume.map( resume => <CardResume title={resume} value={"100"} key={resume}/> )
                }
            </section>
            <main className="mt-7 flex gap-4">
                <div className="p-2 rounded-lg bg-amber-100 space-y-3 w-1/4">
                    <div className="flex justify-between py-3 px-2">
                        <p className="font-bold">Nuevo</p>
                        <p className="px-1 rounded bg-blue-200">{ordenesClasificadas.nuevo.length}</p>
                    </div>
                    {
                        ordenesClasificadas.nuevo.map( order => 
                            <CardPedido 
                                key={order.id}
                                order={order}
                            />
                        )
                    }
                </div>
                <div className="p-2 rounded-lg bg-amber-100 space-y-3 w-1/4">
                    <div className="flex justify-between py-3 px-2">
                        <p className="font-bold">En preparación</p>
                        <p className="px-1 rounded bg-blue-200">{ordenesClasificadas.preparando.length}</p>
                    </div>
                    {
                        ordenesClasificadas.preparando.map( order => 
                            <CardPedido 
                                key={order.id}
                                order={order}
                            />
                        )
                    }
                </div>
                <div className="p-2 rounded-lg bg-amber-100 space-y-3 w-1/4">
                    <div className="flex justify-between py-3 px-2">
                        <p className="font-bold">Enviado</p>
                        <p className="px-1 rounded bg-blue-200">{ordenesClasificadas.enviado.length}</p>
                    </div>
                    {
                        ordenesClasificadas.enviado.map( order => 
                            <CardPedido 
                                key={order.id}
                                order={order}
                            />
                        )
                    }
                </div>
                <div className="p-2 rounded-lg bg-amber-100 space-y-3 w-1/4">
                    <div className="flex justify-between py-3 px-2">
                        <p className="font-bold">Completado</p>
                        <p className="px-1 rounded bg-blue-200">{ordenesClasificadas.completado.length}</p>
                    </div>
                    {
                        ordenesClasificadas.completado.map( order => 
                            <CardPedido 
                                key={order.id}
                                order={order}
                            />
                        )
                    }
                </div>
            </main>
        </div>
    )
}