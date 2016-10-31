import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Patient } from './patient';
import { PatientDetailsComponent } from './patient-details.component';
import { PatientsService } from './patients.service';

@Component({
  selector: 'patients-list',
  directives: [PatientDetailsComponent, ROUTER_DIRECTIVES],
  template: `
  <!-- this is the new syntax for ng-repeat -->
  <ul class="patients">
    <li *ngFor="#patient of patients" >
      <a href="#" [routerLink]="['Patient Details', {id: patient.id}]">{{patient.name}}</a>
    </li>
  </ul>
  <h6>Thanks to http://www.barbarianmeetscoding.com/blog/categories/angular2-step-by-step/ </h6>
  `,
  styleUrls: ['html/patients/patients.component.css']
})
export class PatientComponent implements OnInit{
  patients: Patient[] = [];
  selectedPatient: Patient;

  constructor(private patientsService : PatientsService){ }

  ngOnInit(){
    //this.patients = this.starWarsService.getAll();
    this.patientsService
      .getAllPatients()
      .subscribe(p => this.patients = p)
  }

  selectPatient(patient: Patient){
    this.selectedPatient = patient;
  }
}
