import type { ReactNode } from "react";

type TopTitleBarProps = {
    children?: ReactNode,
    title: string,
    description: string
};

export default function TopTitleBar({children, title, description}: TopTitleBarProps){
    return (
        <section className="flex justify-between w-full">
            <div className="">
                <h2 className="font-bold text-3xl">{title}</h2>
                <p className="text-sm text-amber-950 font-light">{description}</p>
            </div>
            <div className="flex gap-4">
                {children && children}
            </div>
        </section>
    )
};