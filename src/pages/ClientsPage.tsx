import TopTitleBar from "../components/TopTitleBar";

const data = [
    {
      "id": "6ac5ff082cbdaf121058647e",
      "name": "Test",
      "phone": "9873400897",
      "idConversation": "1"
    },
    {
      "id": "6ac5ff082cbdaf121058647p",
      "name": "Test",
      "phone": "9873400897",
      "idConversation": "1"
    }
  ]

export default function ClientsPage(){
    return(
        <div className="p-10 ml-56">
            <TopTitleBar title="Items" description="Catálogo de la pizzería"/>
            <div className="grid grid-1 w-1/2">
                <div className="flex w-full py-4 px-2 justify-evenly text-sm">
                    <p className="w-full font-semibold text-gray-500">Nombre</p>
                    <p className="w-32 font-semibold text-gray-500">Teléfono</p>
                </div>
                <div className="space-y-1">
                {
                    data.map( (client, index) => 
                        <div 
                            key={client.id} 
                            className={`flex w-full py-3 px-2 justify-evenly text-sm rounded-lg border border-amber-200 ${ index%2 === 0 ? "bg-white" : "bg-amber-100" }`}
                        >
                            <p className="w-full font-bold">{client.name}</p>
                            <p className="w-32">{client.phone}</p>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}