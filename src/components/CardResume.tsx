type CardResume = {
    title: string,
    value: string
}

export default function CardResume({ title, value }: CardResume){
    return(
        <div className="w-1/4 bg-white border border-orange-300 rounded-xl p-3 space-y-2">
            <h3 className="font-light text-sm text-orange-950">{title}</h3>
            <p className="font-bold text-2xl">{value}</p>
        </div>
    )
};