import { api } from "../config/axios";
import { ClientSchema } from "../types";

export const getClients = async () => {
    const url = "/clients";
    const result = await api.get(url);
    const { success, data, error } = ClientSchema.array().safeParse(result.data.data);
    if( !success ){
        throw new Error(`Error al validar los datos: ${error.message}`);
    };
    return data;
};