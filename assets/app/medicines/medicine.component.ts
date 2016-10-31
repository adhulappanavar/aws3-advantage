import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Medicine } from './medicine';
import { MedicineDetailsComponent } from './medicine-details.component';
import { MedicinesService } from './medicines.service';

@Component({
  selector: 'medicines-list',
  directives: [MedicineDetailsComponent, ROUTER_DIRECTIVES],
  template: `
  <!-- this is the new syntax for ng-repeat -->
  <ul class="medicines">
    <li *ngFor="#medicine of medicines" >
      <a href="#" [routerLink]="['Medicine Details', {id: medicine.id}]">{{medicine.name}}</a>
    </li>
  </ul>
  <h6>Thanks to http://www.barbarianmeetscoding.com/blog/categories/angular2-step-by-step/ </h6>
  `,
  styleUrls: ['html/medicines/medicines.component.css']
})
export class MedicineComponent implements OnInit{
  medicines: Medicine[] = [];
  selectedMedicine: Medicine;

  constructor(private medicinesService : MedicinesService){ }

  ngOnInit(){
    //this.medicines = this.starWarsService.getAll();
    this.medicinesService
      .getAllMedicines()
      .subscribe(p => this.medicines = p)
  }

  selectMedicine(medicine: Medicine){
    this.selectedMedicine = medicine;
  }
}
