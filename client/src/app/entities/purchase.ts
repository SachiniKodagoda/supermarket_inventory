import {User} from "./user";
import {Supplier} from "./supplier";
import {DataPage} from "../shared/data-page";
import {Purchaseitem} from "./purchaseitem";

export class Purchase{
  id: number;
  code: string;
  tocreation: string;
  description: string;
  creator: User;
  supplier: Supplier;
  date: string;
  total: number;

  purchaseitemList: Purchaseitem[];

  constructor(id: number) {
    this.id = id;
  }
}
export class PurchaseDataPage extends DataPage{
  content: Purchase[];
}
