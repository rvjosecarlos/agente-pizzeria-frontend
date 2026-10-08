import { useState } from "react";
import TopTitleBar from "../components/TopTitleBar";
import { formatDate } from "../utils/formatDate";
import StandarButton from "../components/StandarButton";
import { useNavigate } from "react-router-dom";

const data = [
    {
      "id": "6ac5cef5128d53999596fd90",
      "name": "Pizza Hawaiana",
      "size": "Chica",
      "precio": 70
    },
    {
      "id": "6ac5d783457dba004de4dba9",
      "name": "Pizza Hawaiana",
      "size": "Mediana",
      "precio": 90
    },
    {
      "id": "6ac5d791457dba004de4dbaa",
      "name": "Pizza Hawaiana",
      "size": "Grande",
      "precio": 110
    },
    {
      "id": "6ac5d79c457dba004de4dbab",
      "name": "Pizza Hawaiana",
      "size": "Familiar",
      "precio": 130
    },
    {
      "id": "6ac5d7b0457dba004de4dbac",
      "name": "Pizza Hawaiana",
      "size": "Jumbo",
      "precio": 180
    }
  ]

type ItemDetailType = {
    itemId: string,
    cantidad: number,
    subtotal: number,
    precio: number,
    key: `${string}-${string}-${string}-${string}-${string}`
};

export default function CrearPedidoPage(){
    const [itemsList, setItemsList] = useState(data);
    const [itemsDetails, setItemsDetails] = useState<ItemDetailType[]>([{ itemId: "", cantidad: 0, precio: 0, key: crypto.randomUUID(), subtotal: 0.0}]);
    const navigate = useNavigate();

    const handleAgregarLinea = () => {
        setItemsDetails( itemsDetails => [...itemsDetails, { itemId: "", cantidad: 0, precio: 0, key: crypto.randomUUID(), subtotal: 0.0 }]);
    };

    const handleQuitarLinea = (key: string) => {
        setItemsDetails( itemsDetails => {
            return itemsDetails.filter( itemDetail => itemDetail.key !== key )
        });
    };

    const handleIniciarPrecioSubtotal = (value: string, itemDetail: ItemDetailType) => {
        const regExp = new RegExp(/[0-9]+/g);
        const valueArr = value.split("-");
        if( valueArr.length < 2 || !regExp.test(valueArr[2]) ) return;
        const precio = parseInt(valueArr[2]);
        const updatedItemsDetail = itemsDetails.map( item => {
            if( item.key === itemDetail.key ){
                return {
                    ...itemDetail,
                    cantidad: 1,
                    subtotal: precio,
                    precio
                };
            };
            return item;
        });
        
        setItemsDetails(updatedItemsDetail);
    };

    const handleCalcularSubtotal = (value: number, itemDetail: ItemDetailType) => {

    };

    return(
        <div className="p-10 ml-56">
            <section>
                <TopTitleBar title="Crear pedido" description={`${formatDate(new Date())}`}/>
            </section>
            <main className="flex flex-1 mt-10 justify-center">
                <form className="p-7 bg-white rounded-lg lg:w-2/3">
                    <p className="text-xs font-light text-amber-950">Usa la misma lógica que la herramienta del LLM. Solo para la demostración.</p>
                    <div className="py-4 space-y-4">
                        <div className="flex justify-between gap-3">
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
                        </div>
                        <div>
                            <p className="text-sm font-bold">Detalle del pedido</p>
                            <div className="text-xs font-bold flex gap-3 py-3">
                                <p className="w-full">Descripcion</p>
                                <p className="w-20">Cantidad</p>
                                <p className="w-16">Precio</p>
                                <p className="w-38">Subtotal</p>
                            </div>
                            <div className="space-y-3">
                                {
                                    itemsDetails.map( itemDetail => 
                                        <div 
                                            className="flex justify-between gap-3"
                                            key={itemDetail.key}
                                        >
                                            <div className="flex flex-col w-full">
                                                <input 
                                                    id="descripcion"
                                                    list="items"
                                                    name="lista-items"
                                                    className="border border-gray-300 rounded-lg p-2 w-full" 
                                                    required
                                                    onChange={(e) => handleIniciarPrecioSubtotal(e.target.value, itemDetail)}
                                                />
                                                <datalist id="items">
                                                    {
                                                        itemsList.map( item => <option key={item.id} value={`${item.name} - ${item.size} - ${item.precio}`} /> )
                                                    }
                                                </datalist>
                                            </div>
                                            <div>
                                                <input 
                                                    id="cantidad"
                                                    type="number" 
                                                    min={1}
                                                    value={itemDetail.cantidad}
                                                    className="border w-14 border-gray-300 rounded-lg p-2 text-center" 
                                                    onChange={() => {}}
                                                />
                                            </div>
                                            <div>
                                                <input 
                                                    id="precio"
                                                    type="text" 
                                                    disabled
                                                    value={itemDetail.precio}
                                                    className="w-12 border-gray-300 rounded-lg p-2 text-center" 
                                                />
                                            </div>
                                            <div>
                                                <input 
                                                    id="subtotal"
                                                    type="text" 
                                                    disabled
                                                    value={itemDetail.subtotal}
                                                    className="w-12 border-gray-300 rounded-lg p-2 text-center" 
                                                />
                                            </div>
                                            <input
                                                type="button"
                                                value={"X"}
                                                className="border w-10 h-10 border-gray-300 rounded-lg p-2 cursor-pointer"
                                                onClick={() => handleQuitarLinea(itemDetail.key)}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                            <StandarButton 
                                name="+ Agregar línea"
                                color="white"
                                onClick={handleAgregarLinea}
                                className="rounded-lg mt-3"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="h-0.5 bg-amber-100"/>
                        <div className="flex justify-between py-4">
                            <p className="">Total:</p>
                            <p className="font-bold text-3xl">{`$400`}</p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <StandarButton name="Cancelar" color="white" onClick={() => navigate("/")} className="rounded-lg"/>    
                        <StandarButton name="Crear Pedido" color="orange" onClick={()=>{}} className="rounded-lg"/>
                    </div>
                </form>
            </main>
        </div>
    )
};