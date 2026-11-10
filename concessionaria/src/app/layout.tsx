import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { site } from "@/config/site";
const manrope=Manrope({subsets:["latin"],variable:"--font-manrope"});
export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:`${site.name} | Concessionária em ${site.city}`,template:`%s | ${site.name}`},description:site.description,openGraph:{title:site.name,description:site.description,locale:"pt_BR",type:"website"}};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="pt-BR"><body className={`${manrope.variable} font-sans`}><Header/><main>{children}</main><Footer/><WhatsAppButton/></body></html>;
}
