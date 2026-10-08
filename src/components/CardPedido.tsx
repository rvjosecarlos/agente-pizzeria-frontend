import StandarButton from "./StandarButton";

type CardPedidoProps = {

};

export default function CardPedido({}: CardPedidoProps){
    return(
        <div className="p-4 rounded-lg border border-amber-200 bg-amber-50 space-y-2">
            <div className="flex justify-between gap-7">
                <p className="font-bold">{`#1042`}</p>
                <p className={`bg-green-400 px-2 py-1 text-xs font-light rounded-xl`}>{`WhatsApp`}</p>
            </div>
            <div>
                <p className="text-sm font-bold">{`Mariana López`}</p>
                <p className="text-sm font-light text-amber-950">{`99 2233 1122`}</p>
            </div>
            <div className="text-sm">
                <p>Esta p se itera</p>
            </div>
            <div className="flex justify-between">
                <p className="font-bold">{`$420`}</p>
                <p className="text-light text-xs text-amber-900">{`hace 4 min`}</p>
            </div>
            <StandarButton name={"Pasar a..."} color="orange" className="w-full rounded-lg" onClick={()=>{}}/>
        </div>
    )
};