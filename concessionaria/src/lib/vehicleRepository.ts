// Camada de acesso a dados: troque por API/banco sem alterar os componentes.
import { vehicles } from "@/data/vehicles";
import type { Vehicle } from "@/types/vehicle";
export async function listVehicles():Promise<Vehicle[]>{return vehicles;}
export async function getVehicleBySlug(slug:string){return vehicles.find(v=>v.slug===slug)??null;}
