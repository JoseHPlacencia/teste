export type VehicleStatus = "available" | "reserved" | "sold";
export interface Vehicle {
  id: string; slug: string; brand: string; model: string; version: string;
  year: number; modelYear: number; mileage: number; price: number;
  fuel: string; transmission: string; color: string; doors: number;
  category: string; condition: "Novo" | "Seminovo" | "Usado";
  description: string; images: string[]; features: string[];
  featured: boolean; status: VehicleStatus;
}
