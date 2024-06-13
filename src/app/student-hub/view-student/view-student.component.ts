import { Component, Inject, Input, Optional } from '@angular/core';
import { Student } from 'src/Models/student.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/services/shared/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent {
  students : any[] = [];
  imageUrl: string | ArrayBuffer | null = null;
  viewForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ViewStudentComponent>,
    private fb: FormBuilder,
    private http: HttpClient,
    private service: SharedService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Student,
  ) {
      this.viewForm = this.fb.group({
        Id: [data.id, Validators.required],
        FirstName: [data.firstName, [Validators.required, Validators.maxLength(50)]],
        LastName: [data.lastName, [Validators.required, Validators.maxLength(50)]],
        Phone: [data.phone, [Validators.required, Validators.maxLength(12)]],
        Email: [data.email, [Validators.required, Validators.email, Validators.maxLength(30)]],
        NIC: [data.nic, [Validators.required, Validators.maxLength(12)]],
        DOB: [data.dob, [Validators.required, Validators.maxLength(10)]],
        Address: [data.address, [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit() {
  console.log(this.data);
  }
 
  loadImage(photo: string): void {
    // Assume the photo is a base64 string for simplicity
    this.imageUrl = `data:image/jpeg;base64,${photo}`;
  }

  closeDialog(): void{
    this.service.allStudents().subscribe((data) => {
      this.students = data;
    });
    this.dialogRef.close();
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
  
}