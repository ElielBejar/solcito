import {z} from "zod";


export function validateCollection(object){
    return esquema_collection.safeParse(object);
}

const esquema_collection = z.object({
    code:z.string(),
    name:z.string(),
    img:z.string().url()
});