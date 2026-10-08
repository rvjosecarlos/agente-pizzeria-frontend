import CardResume from "../components/CardResume";
import CardPedido from "../components/CardPedido";
import TopTitleBar from "../components/TopTitleBar";
import StandarButton from "../components/StandarButton";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const cardsResume = ["Pedidos activos", "Ventas del día", "Ticket promedio", "Cancelados hoy"]

export default function OrdenesPage(){
    const navigate = useNavigate();

    return (
        <div className="p-10 ml-56">
            <TopTitleBar title="Pedidos" description={`${formatDate(new Date())} - Actualizado hace 8s`}>
                <StandarButton 
                    color="white" 
                    name="Agregar item" 
                    className="w-40 rounded-lg"
                    onClick={()=>{}}
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
                        <p className="px-1 rounded bg-blue-200">2</p>
                    </div>
                    <CardPedido />
                    <CardPedido />
                    <CardPedido />
                </div>
                <div className="p-2 rounded-lg bg-amber-100 space-y-3 w-1/4">
                    <div className="flex justify-between py-3 px-2">
                        <p className="font-bold">En preparación</p>
                        <p className="px-1 rounded bg-blue-200">2</p>
                    </div>
                    <CardPedido />
                </div>
                <div className="p-2 rounded-lg bg-amber-100 space-y-3 w-1/4">
                    <div className="flex justify-between py-3 px-2">
                        <p className="font-bold">Enviado</p>
                        <p className="px-1 rounded bg-blue-200">2</p>
                    </div>
                    <CardPedido />
                </div>
                <div className="p-2 rounded-lg bg-amber-100 space-y-3 w-1/4">
                    <div className="flex justify-between py-3 px-2">
                        <p className="font-bold">Completado</p>
                        <p className="px-1 rounded bg-blue-200">2</p>
                    </div>
                    <CardPedido />
                </div>
            </main>
        </div>
    )
}