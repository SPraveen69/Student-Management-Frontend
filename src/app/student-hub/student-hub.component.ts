import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/Models/student.model';
import { SharedService } from 'src/services/shared/shared.service';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>([]);
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'nic', 'action'];

  pageSize = 10;
  pageIndex = 0;
  totalItems = 0;
  loadStudents() {
    this.service.allStudents().subscribe((data: Student[]) => {
      this.students = data;
      this.totalItems = data.length;
      this.dataSource = new MatTableDataSource(this.students);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.dataSource.filterPredicate = (data: Student, filter: string) => {
      const searchTerm = filter.toLowerCase();
      return (
        data.firstName.toLowerCase().includes(searchTerm) ||
        data.lastName.toLowerCase().includes(searchTerm) ||
        data.email.toLowerCase().includes(searchTerm) ||
        data.phone.toLowerCase().includes(searchTerm) ||
        data.nic.toLowerCase().includes(searchTerm)
      );
    };

    this.dataSource.filter = filterValue;
  }

  onPageChange(event:any) : void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  openAddStudentDialog(): void{
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '700px',
      height: '570px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.loadStudents();
      }
    });
  }

  openEditStudentDialog(student: Student):void{
    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '800px',
      height: '433px',
      data: student,
    });

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.loadStudents();
      }
    })
  }

  openViewStudentDialog(student: Student):void{
    const dialogRef = this.dialog.open(ViewStudentComponent, {
      width: '1000px',
      height: '338px',
      data: student,
    });

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.loadStudents();
      }
    })
  }
  
  openDeleteStudentDialog(student: Student):void{
    const dialogRef = this.dialog.open(DeleteStudentComponent, {
      width: '500px',
      height: '200px',
      data: student,
    });

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.loadStudents();
      }
    })
  }

  // toggleStudentDetails(student: Student): void {
  //   if (this.selectedStudent && this.selectedStudent.id === student.id) {
  //     this.selectedStudent = null; 
  //   } else {
  //     this.selectedStudent = student;
  //   }
  }
  
 
