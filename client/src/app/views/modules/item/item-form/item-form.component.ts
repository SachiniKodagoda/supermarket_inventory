import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from "../../../../shared/abstract-component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ItemService} from "../../../../services/item.service";
import {LoggedUser} from "../../../../shared/logged-user";
import {UsecaseList} from "../../../../usecase-list";
import {Item} from "../../../../entities/item";
import {ResourceLink} from "../../../../shared/resource-link";
import {Category} from "../../../../entities/category";
import {CategoryService} from "../../../../services/category.service";

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent extends AbstractComponent implements OnInit {

  categories: Category[]=[];

  form = new FormGroup({
    description: new FormControl(null,[
      Validators.maxLength(65535),
    ]),
    name: new FormControl(null,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")
    ]),
    photo: new FormControl(),
    qty: new FormControl(0,[
      Validators.required,
      Validators.min(0),
      Validators.max(999999999),
      Validators.pattern('^([0-9]+)$')
    ]),

    rop: new FormControl(0,[
      Validators.required,
      Validators.min(0),
      Validators.max(999999999),
      Validators.pattern('^([0-9]+)$')
    ]),
    price: new FormControl(null,[
      Validators.required,
      Validators.min(0.25),
      Validators.max(999999999),
      Validators.pattern('^([0-9]{1,8}([.][0-9]{2})?)$')
    ]),
    category: new FormControl(null,[
      Validators.required,
    ])
  });

  get descriptionField(): FormControl{
    return this.form.controls.description as FormControl;
  }

  get nameField(): FormControl{
    return this.form.controls.name as FormControl;
  }

  get photoField(): FormControl{
    return this.form.controls.photo as FormControl;
  }

  get qtyField(): FormControl{
    return this.form.controls.qty as FormControl;
  }

  get ropField(): FormControl{
    return this.form.controls.rop as FormControl;
  }

  get priceField(): FormControl{
    return this.form.controls.price as FormControl;
  }

  get categoryField(): FormControl{
    return this.form.controls.category as FormControl;
  }


  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private itemService: ItemService,
    private categoryService: CategoryService
  ) {super(); }

  ngOnInit(): void {
    this.loadData();
    this.refreshData();
  }

  async loadData(): Promise<any>{

    this.updatePrivileges();
    if (!this.privilege.add) { return; }

    this.categoryService.getAll().then((categories) => {
      this.categories = categories;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_ITEM);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_ITEMS);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_ITEM_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_ITEM);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_ITEM);
  }

  async submit(): Promise<void> {
    this.photoField.updateValueAndValidity();
    this.photoField.markAsTouched();
    if (this.form.invalid) { return; }

    const item: Item = new Item();
    item.name = this.nameField.value;

    const photoIds = this.photoField.value;
    if (photoIds !== null && photoIds !== []){
      item.photo = photoIds[0];
    }else{
      item.photo = null;
    }
    item.description = this.descriptionField.value;
    item.qty = this.qtyField.value;
    item.rop = this.ropField.value;
    item.price = this.priceField.value;
    item.category = this.categoryField.value;

    try{
      const resourceLink: ResourceLink = await this.itemService.add(item);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/items/' + resourceLink.id);
      } else {
        this.form.reset();
        this.snackBar.open('Successfully saved', null, {duration: 2000});
      }
    }catch (e) {
      switch (e.status) {
        case 401: break;
        case 403: this.snackBar.open(e.error.message, null, {duration: 2000}); break;
        case 400:
          const msg = JSON.parse(e.error.message);
          let knownError = false;
          if (msg.name) { this.nameField.setErrors({server: msg.name}); knownError = true; }
          if (msg.description) { this.descriptionField.setErrors({server: msg.description}); knownError = true; }
          if (msg.qty) { this.qtyField.setErrors({server: msg.contact1}); knownError = true; }
          if (msg.rop) { this.ropField.setErrors({server: msg.contact2}); knownError = true; }
          if (msg.price) { this.priceField.setErrors({server: msg.email}); knownError = true; }
          if (msg.category) { this.categoryField.setErrors({server: msg.address}); knownError = true; }
          if (!knownError) {
            this.snackBar.open('Validation Error', null, {duration: 2000});
          }
          break;
        default:
          this.snackBar.open('Something is wrong', null, {duration: 2000});
      }
    }

  }


}
