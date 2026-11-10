"use client";
import { useState } from "react";
import { contact } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
export default function Page(){
  const [err,setErr]=useState<string[]>([]);
  function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); const d=new FormData(e.currentTarget); const g=(k:string)=>String(d.get(k)||"").trim(); const errs:string[]=[];
    if(g("nome").length<2) errs.push("Informe seu nome.");
    if(g("telefone").replace(/\D/g,"").length<10) errs.push("Informe um telefone válido com DDD.");
    if(g("email")&&!/^\S+@\S+\.\S+$/.test(g("email"))) errs.push("E-mail inválido.");
    if(g("mensagem").length<5) errs.push("Escreva sua mensagem.");
    setErr(errs); if(errs.length) return;
    window.open(waLink(`Olá! Sou ${g("nome")} (${g("telefone")}). Assunto: ${g("assunto")}. ${g("mensagem")}`),"_blank");
  }
  return (<div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2"><div><h1 className="text-3xl font-bold text-ink">Contato</h1>
    <ul className="mt-6 space-y-2"><li>{contact.address}</li><li>{contact.phone}</li><li>{contact.email}</li><li>{contact.hours}</li></ul>
    <a href={contact.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-primary mt-6">Como chegar</a></div>
    <form onSubmit={submit} noValidate className="space-y-3"><p className="text-sm text-neutral-600">Este formulário envia sua mensagem pelo WhatsApp da loja.</p>
      {["nome","telefone","email","assunto"].map(n=><input key={n} name={n} placeholder={n[0].toUpperCase()+n.slice(1)} aria-label={n} className="field"/>)}
      <textarea name="mensagem" rows={4} placeholder="Mensagem" aria-label="mensagem" className="field"/>
      {err.length>0&&<ul role="alert" className="text-sm text-red-700">{err.map(x=><li key={x}>{x}</li>)}</ul>}
      <button className="btn btn-primary">Enviar pelo WhatsApp</button></form></div>);
}
