import { Pipe , PipeTransform } from 'angular2/core';
import { Student } from './student';

@Pipe({
	name : 'studentFilter'
})

export class StudentFilterPipe implements PipeTransform{
	transform(value: Student[] , args : string[]) : Student[] {
		let filter : string = args[0] ? args[0].toLocaleLowerCase() : null;
		return filter  ? value.filter((student : Student) => student.name.toLowerCase().indexOf(filter) != -1) : value ; 
	}	
}