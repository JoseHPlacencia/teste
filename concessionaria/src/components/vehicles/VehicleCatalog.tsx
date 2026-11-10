"use client";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Vehicle } from "@/types/vehicle";
import { applyFilters, emptyFilters, filtersToParams, parseFilters, type Filters } from "@/lib/vehicleFilters";
import VehicleCard from "./VehicleCard";
const PAGE=6;
const sorts=[["featured","Destaques primeiro"],["price-asc","Menor preço"],["price-desc","Maior preço"],["year-desc","Ano mais recente"],["year-asc","Ano mais antigo"],["km-asc","Menor quilometragem"],["km-desc","Maior quilometragem"]];
export default function VehicleCatalog({vehicles}:{vehicles:Vehicle[]}){
  const router=useRouter(); const f=parseFilters(useSearchParams()); const [shown,setShown]=useState(PAGE);
  const set=(p:Partial<Filters>)=>{setShown(PAGE);router.replace(`/veiculos?${filtersToParams({...f,...p})}`,{scroll:false});};
  const list=useMemo(()=>applyFilters(vehicles,f),[vehicles,f.q,f.brand,f.category,f.fuel,f.transmission,f.condition,f.minYear,f.maxYear,f.minPrice,f.maxPrice,f.maxKm,f.featured,f.sort]); // eslint-disable-line
  const uniq=(k:keyof Vehicle)=>Array.from(new Set(vehicles.map(v=>String(v[k])))).sort();
  const sel=(label:string,k:keyof Filters,opts:string[][])=><label className="text-xs font-semibold">{label}
    <select className="field mt-1 font-normal" value={String(f[k])} onChange={e=>set({[k]:e.target.value} as Partial<Filters>)}><option value="">Todos</option>{opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>;
  const num=(label:string,k:keyof Filters)=><label className="text-xs font-semibold">{label}
    <input type="number" className="field mt-1 font-normal" value={f[k]||""} onChange={e=>set({[k]:Number(e.target.value)||0} as Partial<Filters>)}/></label>;
  const chips=(Object.keys(f) as (keyof Filters)[]).filter(k=>k!=="sort"&&f[k]&&f[k]!==emptyFilters[k]);
  return (<div className="grid gap-8 lg:grid-cols-[280px_1fr]">
    <aside className="space-y-3 rounded-2xl border border-neutral-200 p-4 lg:sticky lg:top-20 lg:self-start">
      <label className="text-xs font-semibold">Buscar<input className="field mt-1 font-normal" placeholder="Marca, modelo ou versão" value={f.q} onChange={e=>set({q:e.target.value})}/></label>
      {sel("Marca","brand",uniq("brand").map(x=>[x,x]))}{sel("Categoria","category",uniq("category").map(x=>[x,x]))}
      {sel("Combustível","fuel",uniq("fuel").map(x=>[x,x]))}{sel("Câmbio","transmission",uniq("transmission").map(x=>[x,x]))}
      {sel("Condição","condition",["Novo","Seminovo","Usado"].map(x=>[x,x]))}
      <div className="grid grid-cols-2 gap-2">{num("Ano mín.","minYear")}{num("Ano máx.","maxYear")}{num("Preço mín.","minPrice")}{num("Preço máx.","maxPrice")}</div>
      {num("Quilometragem máx.","maxKm")}
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.featured} onChange={e=>set({featured:e.target.checked})}/>Apenas destaques</label>
      <button className="btn w-full border border-neutral-300" onClick={()=>{setShown(PAGE);router.replace("/veiculos",{scroll:false});}}>Limpar filtros</button>
    </aside>
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p className="font-semibold" aria-live="polite">{list.length} {list.length===1?"veículo encontrado":"veículos encontrados"}</p>
        <select aria-label="Ordenar" className="field w-auto" value={f.sort} onChange={e=>set({sort:e.target.value})}>{sorts.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></div>
      {chips.length>0&&<div className="mb-4 flex flex-wrap gap-2">{chips.map(k=><button key={k} onClick={()=>set({[k]:emptyFilters[k]} as Partial<Filters>)} className="rounded-full bg-neutral-100 px-3 py-1 text-xs">{String(f[k]==true?"Destaques":f[k])} ✕</button>)}</div>}
      {list.length===0?<p className="rounded-2xl bg-neutral-100 p-8 text-center">Nenhum veículo encontrado com esses filtros. Tente remover algum deles.</p>:
      <><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{list.slice(0,shown).map(v=><VehicleCard key={v.id} v={v}/>)}</div>
      {shown<list.length&&<div className="mt-8 text-center"><button className="btn btn-primary" onClick={()=>setShown(shown+PAGE)}>Carregar mais</button></div>}</>}
    </section></div>);
}
