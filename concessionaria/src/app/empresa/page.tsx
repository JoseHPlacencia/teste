import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/config/site";
export const metadata:Metadata={title:"A empresa",description:`Conheça a história da ${site.name}.`};
const blocks=[["Missão","Texto demonstrativo: oferecer uma compra transparente e segura."],["Visão","Texto demonstrativo: ser referência em confiança no mercado local."],["Valores","Texto demonstrativo: transparência, respeito e compromisso com o cliente."]];
export default function Page(){
  return (<><section className="bg-ink py-20 text-white"><div className="mx-auto max-w-6xl px-4"><h1 className="text-4xl font-semibold">Conheça nossa história</h1></div></section>
    <section className="mx-auto max-w-3xl px-4 py-14"><h2 className="text-2xl font-bold text-ink">Nossa trajetória</h2>
      <p className="mt-3">Texto demonstrativo. Substitua pelo ano de fundação, origem da empresa, motivações dos fundadores e crescimento da concessionária.</p></section>
    <section className="bg-neutral-100 py-14"><div className="mx-auto grid max-w-6xl gap-5 px-4 md:grid-cols-3">{blocks.map(([t,d])=><div key={t} className="rounded-2xl bg-white p-6 shadow-sm"><h3 className="font-bold text-ink">{t}</h3><p className="mt-2 text-sm">{d}</p></div>)}</div></section>
    <section className="py-16 text-center"><h2 className="text-2xl font-bold text-ink">Está procurando seu próximo veículo?</h2><Link href="/veiculos" className="btn btn-primary mt-5">Confira nosso estoque</Link></section></>);
}
