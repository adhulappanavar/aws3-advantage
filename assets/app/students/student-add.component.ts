import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { StudentsService } from './students.service';
import { Student } from './student';

@Component({
  selector: 'student-details',
  templateUrl: 'html/students/student-add.component.html',
  styleUrls: ['html/students/student-add.component.css']
})
export class StudentAddComponent implements OnInit {
    student : Student = {name : " hello " , url : "csc" , schoolName:"123" , standard:"12" , mongoId:""};
    isSaving: boolean = false; 
    professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

    constructor(private studentsService: StudentsService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){       
       // this.student.name="hello";
       // this.student.schoolName="hi";
       // this.student.url="";
       // this.student.standard="";
        
    }

    gotoPeoplesList(){
        let link = ['Students'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveNewStudentDetails(){
      this.isSaving = true;
      this.studentsService
          .saveNewStudent(this.student)
          .subscribe( 
            (r: Response) => {console.log('success, '+ JSON.stringify(this.student))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }
}