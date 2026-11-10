"use client";
import { useState } from "react";
export default function VehicleGallery({images,alt}:{images:string[];alt:string}){
  const [i,setI]=useState(0); const [full,setFull]=useState(false);
  return (<div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <button className="block w-full" onClick={()=>setFull(true)} aria-label="Ampliar foto"><img src={images[i]} alt={`${alt} - foto ${i+1}`} className="aspect-[3/2] w-full rounded-2xl object-cover"/></button>
    <div className="mt-3 grid grid-cols-4 gap-2">{images.map((s,n)=>/* eslint-disable-next-line @next/next/no-img-element */<button key={s} onClick={()=>setI(n)} aria-label={`Foto ${n+1}`}><img src={s} alt="" loading="lazy" className={`aspect-[3/2] w-full rounded-lg object-cover ${n===i?"ring-2 ring-accent":"opacity-70"}`}/></button>)}</div>
    {full&&<div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4" onClick={()=>setFull(false)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={images[i]} alt={alt} className="max-h-full max-w-full"/>
      <button className="absolute left-4 top-1/2 text-4xl text-white" aria-label="Anterior" onClick={e=>{e.stopPropagation();setI((i+images.length-1)%images.length);}}>‹</button>
      <button className="absolute right-4 top-1/2 text-4xl text-white" aria-label="Próxima" onClick={e=>{e.stopPropagation();setI((i+1)%images.length);}}>›</button>
      <button className="absolute right-4 top-4 text-2xl text-white" aria-label="Fechar">✕</button></div>}
  </div>);
}
