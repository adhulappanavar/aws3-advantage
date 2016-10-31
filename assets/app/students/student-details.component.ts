import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { StudentsService } from './students.service';
import { Student } from './student';

@Component({
  selector: 'student-details',
  templateUrl: 'html/students/student-details.component.html',
  styleUrls: ['html/students/student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
    @Input() student : Student;
    isSaving: boolean;
    professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

    constructor(private studentsService: StudentsService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){
//        let id = Number.parseInt(this.routeParams.get('id'));
        let id = this.routeParams.get('id');
        console.log('getting student with id: ', id);
        this.studentsService
          .getStudents(id)
          .subscribe(p => this.student = p);
    }

    gotoPeoplesList(){
        let link = ['Students'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    saveStudentDetails(){
      this.isSaving = true;
      this.studentsService
          .saveStudent(this.student)
          .subscribe(
 //           (r: Response) => {console.log('success, id:'+this.student.id+', Name:'+this.student.name+', Weight:'+this.student.weight)},
            (r: Response) => {console.log('success, '+ JSON.stringify(this.student))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }
}
