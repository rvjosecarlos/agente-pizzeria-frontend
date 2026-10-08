import StandarButton from "./StandarButton";

export default function FormNewItem(){
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
                />
                <select 
                    name="tamanio" 
                    id="tamanio"
                    className="p-2 border border-gray-200 rounded-lg"
                >
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
                />
                <StandarButton 
                    className="rounded-lg"
                    color="orange"
                    name="Agregar"
                    onClick={()=>{}}
                />
            </form>
        </div>
    )
};