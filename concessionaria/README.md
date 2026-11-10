# Concessionária (MV Auto)
Next.js 14 (App Router) + TypeScript + Tailwind.
Rodar: `npm install && npm run dev`. Build: `npm run build`.
- Dados da loja e WhatsApp: `src/config/site.ts` e `.env` (`NEXT_PUBLIC_WHATSAPP`, copie de `.env.example`).
- Veículos: `src/data/vehicles.ts` (dados DEMONSTRATIVOS). Fotos: troque as URLs em `images`.
- Acesso a dados: `src/lib/vehicleRepository.ts` (trocar por API/banco no futuro).
