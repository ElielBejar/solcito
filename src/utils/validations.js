import {z} from "zod";


export function validateCollection(object){
    const new_object = {
        code:parseInt(object.code),
        name:object.name,
        img:object.img
    }

    return esquema_collection.safeParse(new_object);
}

export function validateStock(object){

    const new_object = {
        code:parseInt(object.code),
        print:parseInt(object.print),
        size:object.size,
        quantity:parseInt(object.quantity)
    }

    return esquema_stock.safeParse(new_object);
}

export function validatePartialStock(object){
    const new_object = {
        code:parseInt(object.code),
        print:parseInt(object.print),
        size:object.size,
        quantity:parseInt(object.quantity)
    }

    return esquema_stock.partial().safeParse(new_object);
}

export function validateProduct(object){
    //debido al stringify, hay que restaurar los valores que eran numeros:
    const new_object = {
       code: parseInt(object.code),
       name: object.name,
       print: parseInt(object.print),
       img: object.img,
       price: parseFloat(object.price),
       group: parseInt(object.group),
       collection:parseInt(object.collection)
    }

    return esquema_product.safeParse(new_object);
}

const esquema_collection = z.object({
    code:z.number(),
    name:z.string(),
    img:z.string().optional()
});

const esquema_product = z.object({
    code: z.number().int().positive(),
    name: z.string(),
    print: z.number().int().positive(),
    img: z.string(),
    price:z.number().positive(),
    group:z.number().int().positive(),
    collection:z.number().int()
});

const esquema_stock = z.object({
    code: z.number().int().positive(),
    print: z.number().int().positive(),
    size: z.string(),
    quantity: z.number().int().positive()
});