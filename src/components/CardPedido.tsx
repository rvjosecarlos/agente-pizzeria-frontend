import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { OrderType } from "../pages/OrdenesPage";
import StandarButton from "./StandarButton";
import type z from "zod";
import type { UpdatedOrderSchema } from "../types";
import { updateOrderState } from "../api/ordersAPI";
import { elapsedTime } from "../utils/elapsedTime";

type CardPedidoProps = {
    order: OrderType
};

export type UpdatedOrder = z.infer<typeof UpdatedOrderSchema>;

const ESTADOS = ["nuevo", "preparando", "enviado", "completado", "cancelado"] as const;

export default function CardPedido({ order }: CardPedidoProps){

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateOrderState,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["ordenes"]})
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const handleEstado = () => {
        const orderDetailIds = order.orderDetailIds.map( orderDetail => orderDetail.id );
        const updatedOrderState: UpdatedOrder = {
            ...order,
            clientId: order.clientId.id,
            orderDetailIds: [...orderDetailIds],
            estado: ESTADOS[ESTADOS.indexOf(order.estado) + 1]
        };
        console.log({ updatedOrderState });
        mutation.mutate(updatedOrderState);
    };

    const orderDate = new Date(order.updatedAt).getTime();
    const today = Date.now();
    const elapsedTimeString = elapsedTime(orderDate, today);

    return(
        <div className="p-4 rounded-lg border border-amber-200 bg-amber-50 space-y-2">
            <div className="flex justify-between gap-7">
                <p className="font-bold">#{order.id.slice(order.id.length-4).toUpperCase()}</p>
                <p className={` px-2 py-1 text-xs font-light rounded-xl ${order.origen === "whatsapp" ? "bg-green-400" : "bg-sky-300"}`}>{order.origen}</p>
            </div>
            <div>
                <p className="text-sm font-bold">{order.clientId.name}</p>
                <p className="text-sm font-light text-amber-950">{order.clientId.phone}</p>
            </div>
            <div className="text-sm">
                {
                    order.orderDetailIds.map( detalles =>
                        <p key={detalles.id}>{`${detalles.itemId.name} - ${detalles.itemId.size} `}</p>
                    )
                }
            </div>
            <div className="flex justify-between">
                <p className="font-bold">${order.total}</p>
                <p className="text-light text-xs text-amber-900">{`hace ${elapsedTimeString}`}</p>
            </div>
            {
                order.estado !== "completado" && <StandarButton name={"Siguiente paso"} color="orange" className="w-full rounded-lg" onClick={handleEstado}/>
            }
        </div>
    )
};