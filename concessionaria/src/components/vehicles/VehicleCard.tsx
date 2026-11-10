import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { brl, km } from "@/lib/formatters";
export default function VehicleCard({v}:{v:Vehicle}){
  const off=v.status!=="available";
  return (<article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
    <div className="relative aspect-[3/2] overflow-hidden bg-neutral-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={v.images[0]} alt={`${v.brand} ${v.model} ${v.version}`} loading="lazy" className={`h-full w-full object-cover ${off?"grayscale":""}`}/>
      {v.featured&&<span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">Destaque</span>}
      {off&&<span className="absolute right-3 top-3 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">{v.status==="sold"?"Vendido":"Reservado"}</span>}
    </div>
    <div className="p-4"><h3 className="font-bold text-ink">{v.brand} {v.model}</h3><p className="text-sm text-neutral-500">{v.version}</p>
      <p className="mt-2 text-xs text-neutral-600">{v.year}/{v.modelYear} · {km(v.mileage)} · {v.transmission} · {v.fuel}</p>
      <div className="mt-4 flex items-center justify-between"><p className="text-lg font-extrabold text-ink">{brl(v.price)}</p>
        <Link href={`/veiculos/${v.slug}`} className="btn btn-primary">Ver detalhes</Link></div></div></article>);
}
