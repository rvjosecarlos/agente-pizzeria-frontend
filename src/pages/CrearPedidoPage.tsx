import { useState } from "react";
import TopTitleBar from "../components/TopTitleBar";
import { formatDate } from "../utils/formatDate";
import StandarButton from "../components/StandarButton";
import type z from "zod";
import type { CreateOrderSchema, ItemSchema } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getItems } from "../api/itemsAPI";
import { MoonLoader } from "react-spinners";
import { createOrder } from "../api/ordersAPI";
import { useNavigate } from "react-router-dom";

type Item = z.infer<typeof ItemSchema>;
type ItemDetailType = Item & { cantidad: number, subtotal: number };
export type CreateOrderType = z.infer<typeof CreateOrderSchema>;

const MOSTRADOR = "mostrador" as const;

export default function CrearPedidoPage(){
    const [itemsOrderDetail, setItemsOrderDetail] = useState<ItemDetailType[]>([]);
    const [total, setTotal] = useState(0);
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["items"],
        queryFn: getItems
    });

    const mutation = useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            alert("Orden creada");
            setSpinner(false);
        },
        onError: (error) => {
            alert(error)
            setSpinner(false);
        }
    });

    const handleLimpiar = () => {
         setItemsOrderDetail([])
         setTotal(0);
    }

    const handleAddItem = (item: Item) => {
        let duplicateItem = false;
        let itemsOrder = itemsOrderDetail.map( itemOrderDetail => {
            if( itemOrderDetail.id === item.id ){
                duplicateItem = true;
                return ({
                    ...itemOrderDetail,
                    cantidad: itemOrderDetail.cantidad + 1,
                    subtotal: itemOrderDetail.precio * (itemOrderDetail.cantidad + 1)
                });
            };
            return itemOrderDetail;
        });
        if( !duplicateItem ){
            itemsOrder = [...itemsOrderDetail, {
                ...item,
                cantidad: 1,
                subtotal: item.precio
            }]
        };

        const total = itemsOrder.reduce((acumulador, itemOrder) => {
            return itemOrder.subtotal + acumulador;
        },0);
        setTotal(total);
        setItemsOrderDetail(itemsOrder);
    };

    const handleCreateOrder = () => {
        if(itemsOrderDetail.length === 0 ) return;
        setSpinner(true);
        const newOrder = {
            clientId: import.meta.env.VITE_CLIENTE_MOSTRADOR as string,
            total: total,
            origen: MOSTRADOR,
            orderDetailIds: itemsOrderDetail.map( item => {
                return {
                    itemId: item.id,
                    cantidad: item.cantidad
                }
            })
        }
        mutation.mutate(newOrder);
        navigate("/");
    };

    if(isPending) return <div className="ml-56 h-screen flex justify-center items-center"><MoonLoader color="#36d7b7"/></div>;
    if(isError) return <div className="ml-56 h-screen flex justify-center items-center"><p>{error.message}</p></div>

    if(data) return(
        <div className="p-10 ml-56">
            <section>
                <TopTitleBar title="Crear pedido" description={`${formatDate(new Date())}`}/>
            </section>
            <div className="flex">
                <main className="py-7 px-4 w-full mr-96 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3">
                    {
                        data.map( (item, index) => 
                            <button
                                type="button"
                                key={item.id} 
                                className={`flex flex-col w-full p-4 justify-evenly text-sm rounded-lg border border-amber-200 cursor-pointer hover:bg-orange-600 hover:text-white ${ index%2 === 0 ? "bg-white" : "bg-amber-100" }`}
                                onClick={() => handleAddItem(item)}
                            >
                                <p className="w-full font-bold">{item.name}</p>
                                <p className="">Tamaño: {item.size}</p>
                                <p className=" text-2xl font-semibold">${item.precio}</p>
                            </button>
                        )
                    }
                </main>
                <section className="fixed top-0 right-0 mr-4 flex py-7 justify-center h-screen w-96 overflow-y-scroll bg-white">
                    <form className="px-7 bg-white rounded-lg w-full">
                        <p className="text-xs font-light text-amber-950">Usa la misma lógica que la herramienta del LLM. Solo para la demostración.</p>
                        <div className="py-4 space-y-4">
                            {/*
                            <div className="flex flex-col justify-between gap-3">
                                <div className="flex flex-col w-full">
                                    <label 
                                        htmlFor="cliente"
                                        className="text-sm font-bold"
                                    >
                                        Nombre del cliente 
                                    </label>
                                    <input 
                                        id="cliente" 
                                        type="text" 
                                        className="border border-gray-300 rounded-lg p-2"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label 
                                        htmlFor="telefono"
                                        className="text-sm font-bold"
                                    >
                                        Teléfono
                                    </label>
                                    <input 
                                        id="telefono" 
                                        type="tel" 
                                        className="border border-gray-300 rounded-lg p-2"
                                        required
                                        //pattern="[0-9]{2}-[0-9]{4}-[0-9]{4}"
                                    />
                                </div>
                            </div> 
                            */}
                            <div>
                                <p className="text-sm font-bold">Detalle del pedido</p>
                                <div className="w-full py-3">
                                    {
                                        itemsOrderDetail.map(itemOrder => 
                                            <div className="flex flex-col justify-between py-1 border-y border-amber-100">
                                                <p className="text-sm">{itemOrder.name} - {itemOrder.size} - ${itemOrder.precio}</p>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-sm">Cantidad: {itemOrder.cantidad}</p>
                                                    <p>Subtotal: <span className="font-semibold">${itemOrder.subtotal}</span></p>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="h-0.5 bg-amber-100"/>
                            <div className="flex justify-between py-4">
                                <p className="">Total:</p>
                                <p className="font-bold text-3xl">${total}</p>
                            </div>
                        </div>
                        {
                            spinner ? 
                                <div className="flex justify-center w-full"><MoonLoader size={30}/></div>
                            :
                                <div className="flex justify-end gap-3">
                                    <StandarButton name="Limpiar" color="white" onClick={handleLimpiar} className="rounded-lg"/>    
                                    <StandarButton name="Crear Pedido" color="orange" onClick={handleCreateOrder} className="rounded-lg"/>
                                </div>
                        }
                    </form>
                </section>
            </div>
        </div>
    )
};