import { Suspense } from "react";
import type { Metadata } from "next";
import { listVehicles } from "@/lib/vehicleRepository";
import VehicleCatalog from "@/components/vehicles/VehicleCatalog";
export const metadata:Metadata={title:"Carros seminovos e usados à venda",description:"Explore o estoque e filtre por marca, modelo, ano, preço e mais."};
export default async function Page(){
  const vehicles=await listVehicles();
  return (<div className="mx-auto max-w-6xl px-4 py-12"><h1 className="text-3xl font-bold text-ink">Encontre seu próximo veículo</h1><p className="mb-8 mt-2 text-neutral-600">Explore nosso estoque e descubra opções que combinam com você.</p>
    <Suspense><VehicleCatalog vehicles={vehicles}/></Suspense></div>);
}
