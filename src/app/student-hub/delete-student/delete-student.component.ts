import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from 'src/Models/student.model';
import { SharedService } from 'src/services/shared/shared.service';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent {

  students : any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DeleteStudentComponent>,
    private http: HttpClient,
    private service: SharedService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Student,
  ) {}



  loadStudents(){
    this.service.allStudents().subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 10000, 
      panelClass: 'custom-snackbar'
    });
  }
    showErrorMessage(message: string) {
      this.snackBar.open(message, 'Close', {
        duration: 10000, 
        panelClass: 'custom-snackbar'
      });
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    this.service.deleteStudent(this.data.id).subscribe(
      (response) => {
        console.log('Student Deleted Successfully', response);
        this.dialogRef.close(true);
        this.loadStudents();
        this.showSuccessMessage('STUDENT RECORD IS DELECTED SUCCESSFULLY');
      },
      (error) => {
        console.log('Error in Deleting', error);
        this.dialogRef.close(false); 
        this.showErrorMessage('CANNOT DELETE THIS RECORD!');
      }
    );
  }
}
