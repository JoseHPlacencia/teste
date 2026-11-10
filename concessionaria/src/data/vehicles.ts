import type { Vehicle } from "@/types/vehicle";
// DADOS DEMONSTRATIVOS — não representam o estoque real.
type Row = [string,string,string,number,number,number,string,string,string,string,"Novo"|"Seminovo"|"Usado",boolean,Vehicle["status"]];
const rows: Row[] = [
 ["Toyota","Corolla","XEi 2.0",2023,142900,28000,"Flex","Automático","Prata","Sedan","Seminovo",true,"available"],
 ["Honda","Civic","EXL 2.0",2022,138500,35000,"Flex","Automático","Preto","Sedan","Seminovo",true,"available"],
 ["Volkswagen","T-Cross","Highline 250 TSI",2024,159900,9000,"Flex","Automático","Branco","SUV","Seminovo",true,"available"],
 ["Fiat","Strada","Freedom 1.3",2023,99900,21000,"Flex","Manual","Vermelho","Picape","Seminovo",false,"available"],
 ["Hyundai","HB20","Comfort 1.0",2021,69900,52000,"Flex","Manual","Cinza","Hatch","Usado",false,"available"],
 ["Jeep","Compass","Longitude T270",2022,149900,41000,"Flex","Automático","Azul","SUV","Seminovo",true,"reserved"],
 ["Chevrolet","Onix","LT 1.0 Turbo",2020,67900,63000,"Flex","Automático","Branco","Hatch","Usado",false,"available"],
 ["BMW","320i","Sport",2021,229900,38000,"Gasolina","Automático","Preto","Sedan","Seminovo",false,"sold"],
];
const slugify=(s:string)=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
export const vehicles: Vehicle[] = rows.map(([brand,model,version,year,price,mileage,fuel,transmission,color,category,condition,featured,status],i)=>{
  const slug=slugify(`${brand} ${model} ${version} ${year}`);
  return { id:String(i+1), slug, brand, model, version, year, modelYear:year+1, mileage, price, fuel, transmission, color, doors:4, category, condition,
    description:`${brand} ${model} ${version}. Texto demonstrativo, substitua pela descrição real do veículo.`,
    images:[1,2,3,4].map(n=>`https://picsum.photos/seed/${slug}-${n}/900/600`),
    features:["Ar-condicionado","Direção elétrica","Vidros elétricos","Central multimídia","Câmera de ré"], featured, status };
});
