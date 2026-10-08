import z from "zod";

const ItemSchema = z.object({
    id: z.string(), 
    name: z.string(),
    size: z.string(),
    precio: z.number()
});

export { ItemSchema };