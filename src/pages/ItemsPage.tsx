import FormNewItem from "../components/FormNewItem";
import TopTitleBar from "../components/TopTitleBar";

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
    },
    
  ]

export default function ItemsPage(){
    return(
        <div className="p-10 ml-56">
            <TopTitleBar title="Items" description="Catálogo de la pizzería"/>
            <div>
                <FormNewItem />
            </div>
            <div className="grid grid-1 w-1/2">
                <div className="flex w-full py-4 px-2 justify-evenly text-sm">
                    <p className="w-full font-semibold text-gray-500">Nombre</p>
                    <p className="w-32 font-semibold text-gray-500">Tamaño</p>
                    <p className="w-32 font-semibold text-gray-500">Precio</p>
                </div>
                <div className="space-y-1">
                    {
                        data.map( (item, index) => 
                            <div 
                                key={item.id} 
                                className={`flex w-full py-3 px-2 justify-evenly text-sm rounded-lg border border-amber-200 ${ index%2 === 0 ? "bg-white" : "bg-amber-100" }`}
                            >
                                <p className="w-full font-bold">{item.name}</p>
                                <p className="w-32">{item.size}</p>
                                <p className="w-32">{item.precio}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};