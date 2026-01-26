import { Customer } from "./customer";

export interface CustomerGroup {
    CustomerTypeId: number;
    CustomterTypeName: string;   // giữ đúng y như trong JSON (đề bị typo)
    Customers: Customer[];
  }