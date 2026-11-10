import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getVehicleBySlug, listVehicles } from "@/lib/vehicleRepository";
import { similarVehicles } from "@/lib/vehicleFilters";
import { brl, km } from "@/lib/formatters";
import { vehicleMsg, waLink } from "@/lib/whatsapp";
import { site } from "@/config/site";
import VehicleGallery from "@/components/vehicles/VehicleGallery";
import VehicleCard from "@/components/vehicles/VehicleCard";
type P={params:{slug:string}};
export async function generateStaticParams(){return (await listVehicles()).map(v=>({slug:v.slug}));}
export async function generateMetadata({params}:P):Promise<Metadata>{
  const v=await getVehicleBySlug(params.slug); if(!v) return {};
  return {title:`${v.brand} ${v.model} ${v.version} ${v.year} à venda em ${site.city}`,description:`${v.brand} ${v.model} ${v.version}, ${km(v.mileage)}, ${brl(v.price)}.`,openGraph:{images:[v.images[0]]}};
}
export default async function VehiclePage({params}:P){
  const v=await getVehicleBySlug(params.slug); if(!v) notFound();
  const similar=similarVehicles(await listVehicles(),v); const name=`${v.brand} ${v.model} ${v.version}`;
  const specs:[string,string][]=[["Ano",`${v.year}/${v.modelYear}`],["Quilometragem",km(v.mileage)],["Combustível",v.fuel],["Câmbio",v.transmission],["Cor",v.color],["Portas",String(v.doors)],["Categoria",v.category],["Condição",v.condition]];
  const ld={"@context":"https://schema.org","@type":"Car",name,brand:v.brand,model:v.model,vehicleModelDate:String(v.modelYear),mileageFromOdometer:{"@type":"QuantitativeValue",value:v.mileage,unitCode:"KMT"},offers:{"@type":"Offer",price:v.price,priceCurrency:"BRL"}};
  return (<div className="mx-auto max-w-6xl px-4 py-10"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/>
    <div className="grid gap-10 lg:grid-cols-2"><VehicleGallery images={v.images} alt={name}/>
      <div><h1 className="text-3xl font-bold text-ink">{v.brand} {v.model}</h1><p className="text-neutral-500">{v.version}</p>
        <p className="mt-4 text-3xl font-extrabold text-ink">{brl(v.price)}</p>
        {v.status!=="available"&&<p className="mt-2 font-semibold text-red-700">Veículo {v.status==="sold"?"vendido":"reservado"}</p>}
        <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">{specs.map(([k,x])=><div key={k} className="rounded-lg bg-neutral-100 p-3"><dt className="text-neutral-500">{k}</dt><dd className="font-semibold text-ink">{x}</dd></div>)}</dl>
        <div className="mt-6 flex flex-wrap gap-3">{["Tenho interesse","Consultar pelo WhatsApp","Solicitar mais informações"].map((t,i)=><a key={t} href={waLink(vehicleMsg(v))} className={`btn ${i===0?"btn-primary":"border border-neutral-300"}`}>{t}</a>)}</div>
        <p className="mt-3 text-xs text-neutral-500">Condições de financiamento e troca sob consulta, sem garantia de aprovação.</p></div></div>
    <section className="mt-10"><h2 className="text-xl font-bold text-ink">Descrição</h2><p className="mt-2 max-w-3xl">{v.description}</p>
      <h2 className="mt-8 text-xl font-bold text-ink">Equipamentos</h2><ul className="mt-2 grid gap-1 sm:grid-cols-3">{v.features.map(f=><li key={f}>✓ {f}</li>)}</ul></section>
    <section className="mt-14"><h2 className="mb-5 text-xl font-bold text-ink">Veículos semelhantes</h2><div className="grid gap-5 sm:grid-cols-3">{similar.map(s=><VehicleCard key={s.id} v={s}/>)}</div></section></div>);
}
