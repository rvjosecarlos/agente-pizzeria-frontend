import z from "zod";

const ItemSchema = z.object({
    id: z.string(), 
    name: z.string(),
    size: z.string(),
    precio: z.number()
});

const ClientSchema = z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    idConversation: z.string()
});

const OrderDetailsSchema = z.object({
    id: z.string(),
    cantidad: z.number(),
    itemId: ItemSchema
});

const OrderSchema = z.object({
    id: z.string(),
    clientId: ClientSchema,
    orderDetailIds: z.array(OrderDetailsSchema),
    total: z.number(),
    estado: z.literal(["nuevo", "preparando", "enviado", "completado", "cancelado"]),
    createdAt: z.string(),
    updatedAt: z.string()
});

const UpdatedOrderSchema = OrderSchema.pick({
    id: true,
    total: true,
    estado: true
}).extend({
    clientId: z.string(),
    orderDetailIds: z.array(z.string())
});

export { ItemSchema, ClientSchema, OrderDetailsSchema, OrderSchema, UpdatedOrderSchema };