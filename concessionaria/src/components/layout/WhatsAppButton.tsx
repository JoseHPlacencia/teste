import { MessageCircle } from "lucide-react";
import { waLink, genericMsg } from "@/lib/whatsapp";
export default function WhatsAppButton(){
  return <a href={waLink(genericMsg)} aria-label="Falar no WhatsApp" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg animate-bounce [animation-iteration-count:3]"><MessageCircle/></a>;
}
