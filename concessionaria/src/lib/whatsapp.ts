import { contact } from "@/config/site";
import type { Vehicle } from "@/types/vehicle";
import { brl } from "./formatters";
export const waLink=(msg:string)=>`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(msg)}`;
export const genericMsg="Olá! Vim pelo site e gostaria de mais informações.";
export const vehicleMsg=(v:Vehicle)=>`Olá! Tenho interesse no veículo ${v.brand} ${v.model} ${v.version}, ano ${v.year}, anunciado por ${brl(v.price)} no site de vocês. Gostaria de obter mais informações.`;
