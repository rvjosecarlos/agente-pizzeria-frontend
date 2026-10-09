type ButtonProps = {
    name: string,
    color: "white" | "orange",
    onClick: () => void,
    className: string
};

export default function StandarButton({name, color, onClick, className}: ButtonProps){
    const bgColor = {
        "white": "bg-white border-1 border-orange-300 hover:bg-orange-100",
        "orange": "bg-orange-700 text-white hover:bg-orange-600"
    }
    return (
        <input 
            type="button"
            className={`${bgColor[color]} px-3 py-2 font-semibold cursor-pointer ${className}`}
            onClick={() => onClick()}
            value={name}
        />
    )
}