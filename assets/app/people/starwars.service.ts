import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Person } from '../people/person';

@Injectable()
export class StarWarsService{
  //private baseUrl: string = 'http://swapi.co/api';
    private baseUrl: string = 'http://ec2-35-154-8-81.ap-south-1.compute.amazonaws.com:9000';

  constructor(private http : Http){}

  getAllPeople(): Observable<Person[]>{
    let people$ = this.http
      .get(`${this.baseUrl}/people`)
      .map(mapPersons);
      return people$;
  }
  getPeople(id: string): Observable<Person> {
    let people$ = this.http
      .get(`${this.baseUrl}/people/${id}`)
      .map(mapPerson);
      return people$;
  }
  savePerson(person: Person) : Observable<Response>{
    return this.http
      .post(`${this.baseUrl}/people/${person.id}`, JSON.stringify(person));
  }
}

function mapPersons(response:Response): Person[]{
   return response.json().obj.map(toPerson)
}

function mapPerson(response:Response): Person{
   return toPerson(response.json().obj);
}

function toPerson(r:any): Person{
  let person = <Person>({
//    id: parseInt(r.url.replace('http://swapi.co/api/people/','').replace('/','')),
    id: r._id,
    url: r.url,
    name: r.name,
    weight: r.weight,
    height: r.height,
    mongoId : r._id
  });
  console.log('Parsed person:', person);
  return person;
}
