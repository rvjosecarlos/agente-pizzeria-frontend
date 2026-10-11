import z from "zod";

const ItemSchema = z.object({
    id: z.string(), 
    name: z.string(),
    size: z.string(),
    precio: z.number(),
    codigo: z.string()
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
    origen: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});

const CreateOrderSchema = OrderSchema.pick({
    total: true
}).extend({
    clientId: z.string(),
    orderDetailIds: z.union([z.array(z.string()), z.array(z.object({
        itemId: z.string(),
        cantidad: z.number()
    }))]),
    origen: z.literal(["mostrador"])
});

const UpdatedOrderSchema = OrderSchema.pick({
    id: true,
    total: true,
    estado: true
}).extend({
    clientId: z.string(),
    orderDetailIds: z.array(z.string())
});

export { ItemSchema, ClientSchema, OrderDetailsSchema, OrderSchema, UpdatedOrderSchema, CreateOrderSchema };