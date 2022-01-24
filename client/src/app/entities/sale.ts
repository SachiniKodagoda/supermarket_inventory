import {User} from "./user";
import {DataPage} from "../shared/data-page";
import {Customer} from "./customer";
import {Saleitem} from "./saleitem";

export class Sale {
  id: number;
  code: string;
  tocreation: string;
  description: string;
  creator: User;
  customer: Customer;
  date: string;
  total: number;

  saleitemList: Saleitem[];

  constructor(id: number=null) {
    this.id = id;
  }
}
export class SaleDataPage extends DataPage{
  content: Sale[];
}
