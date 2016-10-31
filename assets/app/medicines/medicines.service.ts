import { Injectable } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Medicine } from '../medicines/medicine';

@Injectable()
export class MedicinesService{
  //private baseUrl: string = 'http://swapi.co/api';
    private baseUrl: string = 'http://ec2-35-154-3-60.ap-south-1.compute.amazonaws.com:9000';

  constructor(private http : Http){}

  getAllMedicines(): Observable<Medicine[]>{
    let medicines$ = this.http
      .get(`${this.baseUrl}/medicines`)
      .map(mapMedicines);
      return medicines$;
  }
  getMedicines(id: string): Observable<Medicine> {
    let medicines$ = this.http
      .get(`${this.baseUrl}/medicines/${id}`)
      .map(mapMedicine);
      return medicines$;
  }
  saveMedicine(medicine: Medicine) : Observable<Response>{
           const body = JSON.stringify(medicine);
        const headers = new Headers({'Content-Type': 'application/json'});

         return this.http
              .post(`${this.baseUrl}/medicines/${medicine.id}`,body, {headers: headers});
  }

  
  
}

function mapMedicines(response:Response): Medicine[]{
   return response.json().obj.map(toMedicine)
}

function mapMedicine(response:Response): Medicine{
   return toMedicine(response.json().obj);
}

function toMedicine(r:any): Medicine{
  let medicine = <Medicine>({
//    id: parseInt(r.url.replace('http://swapi.co/api/medicines/','').replace('/','')),
    id: r._id,
    url: r.url,
    name: r.name,
    qty: r.qty,
    totalcost: r.totalcost,
    mongoId : r._id
  });
  console.log('Parsed medicine:', medicine);
  return medicine;
}
