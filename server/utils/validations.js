import {z} from "zod";


export function validateCollection(object){
    return esquema_collection.safeParse(object);
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
    code:z.string(),
    name:z.string(),
    img:z.string().url()
});

const esquema_product = z.object({
    code: z.number().int().positive(),
    name: z.string(),
    print: z.number().int().positive(),
    img: z.string().url(),
    price:z.number().positive(),
    group:z.number().int().positive(),
    collection:z.number().int()
});