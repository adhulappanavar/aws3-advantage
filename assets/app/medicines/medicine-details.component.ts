import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { MedicinesService } from './medicines.service';
import { Medicine } from './medicine';

@Component({
  selector: 'medicine-details',
  templateUrl: 'html/medicines/medicine-details.component.html',
  styleUrls: ['html/medicines/medicine-details.component.css']
})
export class MedicineDetailsComponent implements OnInit {
    @Input() medicine : Medicine;
    isSaving: boolean;
    professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

    constructor(private medicinesService: MedicinesService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){
//        let id = Number.parseInt(this.routeParams.get('id'));
        let id = this.routeParams.get('id');
        console.log('getting medicine with id: ', id);
        this.medicinesService
          .getMedicines(id)
          .subscribe(p => this.medicine = p);
    }

    gotoPeoplesList(){
        let link = ['Medicines'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveMedicineDetails(){
      this.isSaving = true;
      this.medicinesService
          .saveMedicine(this.medicine)
          .subscribe(
 //           (r: Response) => {console.log('success, id:'+this.medicine.id+', Name:'+this.medicine.name+', Weight:'+this.medicine.weight)},
            (r: Response) => {console.log('success, '+ JSON.stringify(this.medicine))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }
}
