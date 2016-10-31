import { Injectable } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Student } from '../students/student';

@Injectable()
export class StudentsService{
  //private baseUrl: string = 'http://swapi.co/api';
    private baseUrl: string = 'http://localhost:3000';

  constructor(private http : Http){}

  getAllStudents(): Observable<Student[]>{
    let students$ = this.http
      .get(`${this.baseUrl}/students`)
      .map(mapStudents);
      return students$;
  }
  getStudents(id: string): Observable<Student> {
    let students$ = this.http
      .get(`${this.baseUrl}/students/${id}`)
      .map(mapStudent);
      return students$;
  }
  saveStudent(student: Student) : Observable<Response>{
        const body = JSON.stringify(student);
        const headers = new Headers({'Content-Type': 'application/json'});

         return this.http
              .post(`${this.baseUrl}/students/${student.id}`,body, {headers: headers});
  }

  saveNewStudent(student: Student) : Observable<Response>{
      console.log("In SaveNewStudent");
        const body = JSON.stringify(student);
        console.log("body from saveNewStudent : " , body);
        const headers = new Headers({'Content-Type': 'application/json'});

         return this.http.post('/students' , body, {headers: headers});
  }
}

function mapStudents(response:Response): Student[]{
   return response.json().obj.map(toStudent)
}

function mapStudent(response:Response): Student{
   return toStudent(response.json().obj);
}

function toStudent(r:any): Student{
  let student = <Student>({
//    id: parseInt(r.url.replace('http://swapi.co/api/students/','').replace('/','')),
    id: r._id,
    url: r.url,
    name: r.name,
    schoolName: r.schoolName,
    standard :  r.standard,
    mongoId : r._id
  });
  console.log('Parsed student:', student);
  return student;
}
