import type { UpdatedOrder } from "../components/CardPedido";
import { api } from "../config/axios";
import { OrderSchema, UpdatedOrderSchema } from "../types";

export const getOrders = async () => {
    const url = "/ordenes";
    const result = await api.get(url);
    const { success, data, error } = OrderSchema.array().safeParse(result.data.data);
    if( !success ){
        throw new Error(`Error al obtener las ordenes ORDERS: ${error.message}`);
    };
    return data;
};

export const updateOrderState = async (orderUpdated: UpdatedOrder) => {
    const url = "/orden";
    const result = await api.put(url, orderUpdated);
    const { success, data, error } = UpdatedOrderSchema.safeParse(result.data.data);
    if( !success ){
        throw new Error(`Error al validar los datos de actualización de la orden: ${error.message}`);
    };
    return data;
};