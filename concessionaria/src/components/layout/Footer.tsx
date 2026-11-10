import Link from "next/link";
import { contact, nav, site } from "@/config/site";
export default function Footer(){
  return (<footer className="bg-ink text-sm text-white/70"><div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
    <div><p className="text-xl font-extrabold text-white">{site.name}</p><p className="mt-3 max-w-xs">{site.description}</p></div>
    <div><p className="mb-3 font-semibold text-white">Navegação</p><ul className="space-y-2">{nav.map(i=><li key={i.href}><Link href={i.href}>{i.label}</Link></li>)}</ul></div>
    <div className="space-y-1"><p className="mb-3 font-semibold text-white">Contato</p><p>{contact.address}</p><p>{contact.phone}</p><p>{contact.email}</p><p>{contact.hours}</p>
      <p className="pt-2"><a href={contact.instagram}>Instagram</a> · <a href={contact.facebook}>Facebook</a></p></div>
  </div><p className="border-t border-white/10 py-4 text-center">© {new Date().getFullYear()} {site.name}. Todos os direitos reservados. Política de privacidade (a definir).</p></footer>);
}
