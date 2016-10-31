import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { PatientsService } from './patients.service';
import { Patient } from './patient';

@Component({
  selector: 'patient-details',
  templateUrl: 'html/patients/patient-details.component.html',
  styleUrls: ['html/patients/patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
    @Input() patient : Patient;
    isSaving: boolean;
    professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

    constructor(private patientsService: PatientsService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){
//        let id = Number.parseInt(this.routeParams.get('id'));
        let id = this.routeParams.get('id');
        console.log('getting patient with id: ', id);
        this.patientsService
          .getPatients(id)
          .subscribe(p => this.patient = p);
    }

    gotoPeoplesList(){
        let link = ['Patients'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    savePatientDetails(){
      this.isSaving = true;
      this.patientsService
          .savePatient(this.patient)
          .subscribe(
 //           (r: Response) => {console.log('success, id:'+this.patient.id+', Name:'+this.patient.name+', Weight:'+this.patient.weight)},
            (r: Response) => {console.log('success, '+ JSON.stringify(this.patient))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }
}
