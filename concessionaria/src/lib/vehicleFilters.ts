import type { Vehicle } from "@/types/vehicle";
export interface Filters{q:string;brand:string;category:string;fuel:string;transmission:string;condition:string;minYear:number;maxYear:number;minPrice:number;maxPrice:number;maxKm:number;featured:boolean;sort:string}
export const emptyFilters:Filters={q:"",brand:"",category:"",fuel:"",transmission:"",condition:"",minYear:0,maxYear:0,minPrice:0,maxPrice:0,maxKm:0,featured:false,sort:"featured"};
export function parseFilters(p:URLSearchParams):Filters{
  const n=(k:string)=>Number(p.get(k))||0, s=(k:string)=>p.get(k)??"";
  return {q:s("q"),brand:s("brand"),category:s("category"),fuel:s("fuel"),transmission:s("transmission"),condition:s("condition"),minYear:n("minYear"),maxYear:n("maxYear"),minPrice:n("minPrice"),maxPrice:n("maxPrice"),maxKm:n("maxKm"),featured:p.get("featured")==="1",sort:s("sort")||"featured"};
}
export function filtersToParams(f:Filters){
  const p=new URLSearchParams();
  (Object.keys(f) as (keyof Filters)[]).forEach(k=>{const v=f[k]; if(v&&v!==emptyFilters[k]) p.set(k,v===true?"1":String(v));});
  return p;
}
const norm=(s:string)=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
export function applyFilters(list:Vehicle[],f:Filters){
  const out=list.filter(v=>
    (!f.q||norm(`${v.brand} ${v.model} ${v.version}`).includes(norm(f.q)))&&
    (!f.brand||v.brand===f.brand)&&(!f.category||v.category===f.category)&&(!f.fuel||v.fuel===f.fuel)&&
    (!f.transmission||v.transmission===f.transmission)&&(!f.condition||v.condition===f.condition)&&
    (!f.minYear||v.year>=f.minYear)&&(!f.maxYear||v.year<=f.maxYear)&&
    (!f.minPrice||v.price>=f.minPrice)&&(!f.maxPrice||v.price<=f.maxPrice)&&
    (!f.maxKm||v.mileage<=f.maxKm)&&(!f.featured||v.featured));
  const by:Record<string,(a:Vehicle,b:Vehicle)=>number>={
    "price-asc":(a,b)=>a.price-b.price,"price-desc":(a,b)=>b.price-a.price,
    "year-desc":(a,b)=>b.year-a.year,"year-asc":(a,b)=>a.year-b.year,
    "km-asc":(a,b)=>a.mileage-b.mileage,"km-desc":(a,b)=>b.mileage-a.mileage,
    featured:(a,b)=>Number(b.featured)-Number(a.featured)};
  return out.sort(by[f.sort]??by.featured);
}
export function similarVehicles(all:Vehicle[],v:Vehicle,n=3){
  const score=(o:Vehicle)=>(o.category===v.category?3:0)+(o.brand===v.brand?1:0)+(Math.abs(o.price-v.price)<30000?2:0)+(Math.abs(o.year-v.year)<=1?1:0);
  return all.filter(o=>o.id!==v.id&&o.status!=="sold").sort((a,b)=>score(b)-score(a)).slice(0,n);
}
