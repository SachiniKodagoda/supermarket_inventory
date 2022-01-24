import {User} from "./user";
import {Suppliertype} from "./suppliertype";
import {Supplierstatus} from "./supplierstatus";
import {DataPage} from "../shared/data-page";

export class Supplier{
  id: number;
  code: string;
  tocreation: string;
  description: string;
  name: string;
  logo: string;
  contact1: string;
  contact2: string;
  address: string;
  email: string;
  fax: string;
  suppliertype: Suppliertype;
  supplierstatus: Supplierstatus;
  creator: User;


  constructor(id: number=null) {
    this.id = id;
  }
}

export class SupplierDataPage extends DataPage{
  content: Supplier[];
}
