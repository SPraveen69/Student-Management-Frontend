import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/Models/student.model';
import { SharedService } from 'src/services/shared/shared.service';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

@Component({
  selector: 'app-student-hub',
  templateUrl: './student-hub.component.html',
  styleUrls: ['./student-hub.component.css']
})
export class StudentHubComponent {
  students: any[] = [];

  constructor(
    private dialog : MatDialog,
    private service : SharedService
  ){}

  ngOnInit(){
    this.loadStudents();
  }

  @ViewChild(MatPaginator) paginator : MatPaginator | undefined;
  pageSize = 10;
  pageIndex = 0;
  totalItems = 0;
  loadStudents(){
    this.service.allStudents().subscribe(
      (data) => {
        console.log(data);
        this.students = data;
        this.totalItems = this.students.length;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onPageChange(event:any) : void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  openAddStudentDialog(): void{
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '800px',
      height: '450px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.loadStudents();
      }
    });
  }

  openEditStuedentDialog(student: Student):void{
    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '800px',
      height: '450px',
      data: student,
    });

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.loadStudents();
      }
    })
  }
}
 
