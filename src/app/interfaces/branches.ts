import { IBanks } from "./banks";

export interface Ibranches{
    id?: number;
  ref_code: string;
  name:  string;
  short_name:  string;
  
  bank_id: number;
  ifsc:  string;
  address:  string;
  created_at?: Date;
  updated_at?: Date;
}