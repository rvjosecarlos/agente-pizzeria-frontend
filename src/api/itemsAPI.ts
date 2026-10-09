import type { NewItemType } from "../components/FormNewItem";
import { api } from "../config/axios";
import { ItemSchema } from "../types";

export const getItems = async () => {
    const url = "/items";
    const result = await api.get(url);
    const { success, data, error } = ItemSchema.array().safeParse(result.data.data);
    if( !success ){
        throw new Error(`Error al obtener ITEMS: ${error.message}`);
    };
    return data;
};

export const addItem = async (newItem: NewItemType) => {
    const url = "/item";
    const result = await api.post(url, newItem);
    const { success, data, error } = ItemSchema.safeParse(result.data.data);
    if( !success ){
        throw new Error(`Error al recibir los datos del nuevo item NEW_ITEM: ${error.message}`);
    };
    return data;
};