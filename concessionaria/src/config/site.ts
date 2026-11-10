export const site = {
  name: "MV Auto", city: "Vila Velha, ES",
  description: "Veículos selecionados, com procedência e atendimento transparente em Vila Velha.",
  url: "https://exemplo.com.br",
};
export const contact = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "5527999999999",
  phone: "(27) 99999-9999", email: "contato@exemplo.com.br",
  address: "Av. Exemplo, 1000 - Vila Velha, ES",
  hours: "Seg a Sex 9h–18h · Sáb 9h–13h",
  instagram: "https://instagram.com/", facebook: "https://facebook.com/",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Vila+Velha+ES",
};
export const nav = [
  { href: "/", label: "Início" }, { href: "/empresa", label: "A empresa" },
  { href: "/veiculos", label: "Catálogo" }, { href: "/contato", label: "Contato" },
];
