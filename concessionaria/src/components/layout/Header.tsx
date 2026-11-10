"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/config/site";
import { waLink, genericMsg } from "@/lib/whatsapp";
export default function Header(){
  const path=usePathname(); const [open,setOpen]=useState(false);
  const active=(h:string)=>h==="/"?path==="/":path.startsWith(h);
  return (<header className="sticky top-0 z-40 bg-ink/95 text-white backdrop-blur">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
      <Link href="/" className="text-xl font-extrabold">{site.name}</Link>
      <nav className="hidden items-center gap-7 text-sm md:flex" aria-label="Principal">
        {nav.map(i=><Link key={i.href} href={i.href} aria-current={active(i.href)?"page":undefined}
          className={`border-b-2 py-1 ${active(i.href)?"border-accent":"border-transparent text-white/70 hover:text-white"}`}>{i.label}</Link>)}
        <a href={waLink(genericMsg)} className="btn btn-primary">Fale com um vendedor</a>
      </nav>
      <button className="md:hidden" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<nav className="flex flex-col gap-1 border-t border-white/10 px-4 pb-4 md:hidden">
      {nav.map(i=><Link key={i.href} href={i.href} onClick={()=>setOpen(false)} className={`py-3 ${active(i.href)?"text-accent":""}`}>{i.label}</Link>)}
      <a href={waLink(genericMsg)} className="btn btn-primary">Fale com um vendedor</a></nav>}
  </header>);
}
