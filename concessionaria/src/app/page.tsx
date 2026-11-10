import Link from "next/link";
import { listVehicles } from "@/lib/vehicleRepository";
import VehicleCard from "@/components/vehicles/VehicleCard";
export default async function Home(){
  const all=await listVehicles(); const featured=all.filter(v=>v.featured&&v.status==="available").slice(0,4);
  const brands=Array.from(new Set(all.map(v=>v.brand))).sort();
  return (<>
    <section className="bg-ink text-white"><div className="mx-auto max-w-6xl px-4 pb-16 pt-24">
      <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">Encontre o veículo ideal para sua próxima conquista.</h1>
      <p className="mt-5 max-w-xl text-white/70">Qualidade, procedência e confiança para você encontrar o carro que combina com seu estilo e suas necessidades.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/veiculos" className="btn btn-primary">Explorar veículos</Link><Link href="/empresa" className="btn btn-light">Conheça nossa empresa</Link></div>
      <form action="/veiculos" className="mt-12 grid gap-3 rounded-2xl bg-graphite p-4 sm:grid-cols-2 lg:grid-cols-4">
        <select name="brand" aria-label="Marca" className="field"><option value="">Marca</option>{brands.map(b=><option key={b}>{b}</option>)}</select>
        <input name="q" aria-label="Modelo" placeholder="Modelo" className="field"/>
        <input name="minYear" type="number" aria-label="Ano mínimo" placeholder="Ano mín." className="field"/><input name="maxYear" type="number" aria-label="Ano máximo" placeholder="Ano máx." className="field"/>
        <input name="minPrice" type="number" aria-label="Preço mínimo" placeholder="Preço mín." className="field"/><input name="maxPrice" type="number" aria-label="Preço máximo" placeholder="Preço máx." className="field"/>
        <button className="btn btn-primary sm:col-span-2">Encontrar veículos</button></form></div></section>
    <section className="mx-auto max-w-6xl px-4 py-16"><div className="mb-6 flex items-end justify-between"><h2 className="text-2xl font-bold text-ink">Veículos em destaque</h2><Link href="/veiculos" className="text-sm font-semibold text-accent-dark">Ver todos os veículos</Link></div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featured.map(v=><VehicleCard key={v.id} v={v}/>)}</div></section>
    <section className="bg-neutral-100 py-16"><div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2"><div>
      <h2 className="text-2xl font-bold text-ink">Mais do que vender veículos, construímos relações de confiança.</h2>
      <p className="mt-4">Trabalhamos para oferecer uma experiência de compra transparente, segura e personalizada. Nosso compromisso é ajudar cada cliente a encontrar o veículo ideal, com qualidade, procedência e atendimento diferenciado.</p>
      <Link href="/empresa" className="btn btn-primary mt-6">Conheça nossa história</Link></div>
      <ul className="grid gap-3 sm:grid-cols-2">{["Veículos selecionados","Procedência e transparência","Atendimento personalizado","Variedade de modelos","Suporte na negociação","Compromisso com o cliente"].map(t=><li key={t} className="rounded-xl bg-white p-4 font-semibold text-ink shadow-sm">{t}</li>)}</ul></div></section>
    <section className="bg-ink py-16 text-center text-white"><h2 className="text-3xl font-semibold">Seu próximo carro pode estar aqui.</h2><p className="mt-3 text-white/70">Explore nosso catálogo e encontre o veículo ideal para você.</p><Link href="/veiculos" className="btn btn-primary mt-6">Conhecer catálogo</Link></section></>);
}
