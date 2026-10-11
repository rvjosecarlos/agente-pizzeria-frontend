import { useState } from "react";
import StandarButton from "./StandarButton";
import type z from "zod";
import type { ItemSchema } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem } from "../api/itemsAPI";

export type ItemType = z.infer<typeof ItemSchema>;
export type NewItemType = Pick<ItemType, "name" | "precio" | "size" | "codigo">;

export default function FormNewItem(){
    const [newItem, setNewItem] = useState<NewItemType>({ name: "", precio: 0, size: "", codigo: "" });
    
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: addItem,
        onSuccess: () => {
            console.log("Item agregado");
            queryClient.invalidateQueries({queryKey: ["items"]});
            alert("Item agregado")
        },
        onError: (error) => {
            console.error(error.message);
            alert(error.message)
        }
    });

    return(
        <div className="mt-5 w-full bg-white rounded-lg border border-amber-100  p-4">
            <p className="font-bold text-lg mb-3">Nuevo Item</p>
            <form 
                className="flex justify-evenly items-center gap-3"
            >
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    className="p-2 border border-gray-200 rounded-lg w-full"
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <select 
                    name="tamanio" 
                    id="tamanio"
                    className="p-2 border border-gray-200 rounded-lg"
                    onChange={(e) => setNewItem({ ...newItem, size: e.target.value })}
                >
                    <option value="">-</option>
                    <option value="chica">Chica</option>
                    <option value="mediana">Mediana</option>
                    <option value="grande">Grande</option>
                    <option value="familiar">Familiar</option>
                    <option value="jumbo">Jumbo</option>
                </select>
                <input 
                    type="number" 
                    placeholder="Precio" 
                    className="p-2 border border-gray-200 rounded-lg"
                    onChange={(e) => setNewItem({ ...newItem, precio: +e.target.value })}
                />
                <StandarButton 
                    className="rounded-lg"
                    color="orange"
                    name="Agregar"
                    onClick={()=> mutation.mutate({...newItem, codigo: (newItem.name + " " + newItem.precio).trim().replaceAll(" ", "-")})}
                />
            </form>
        </div>
    )
};