import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/services/shared/shared.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  studentForm : FormGroup;
  submitted = false;
  Photo: FormControl = new FormControl(null, Validators.required);
  profilePicture!: File;

  constructor(
    public dialogRef: MatDialogRef<AddStudentComponent>,
    private fb: FormBuilder,
    private http: HttpClient,
    private service: SharedService,
    private snackBar: MatSnackBar
  ){
    const currentDateTime = new Date();

    this.studentForm = this.fb.group({
      Id : ['', [Validators.required,Validators.maxLength(10)]],
      FirstName : ['', [Validators.required,Validators.maxLength(100)]],
      LastName : ['', [Validators.required, Validators.maxLength(100)]],
      Phone : ['', [Validators.required, Validators.maxLength(15)]],
      Email : ['',  [Validators.required, Validators.email, Validators.maxLength(30)]],
      NIC: ['',  [Validators.required, Validators.maxLength(12)]],
      DOB: ['',  [Validators.required, Validators.maxLength(10)]],
      Address: ['',  [Validators.required, Validators.maxLength(100)]],
      //Photo: [],
      status: [1, Validators.required],
      last_sync_date_time: [currentDateTime]
    });
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
  
  onFileSelected(event: any) {
    this.profilePicture = <File>event.target.files[0];
  }
  saveData(): void{
    this.submitted = true;
    if(this.studentForm.valid){
      //const formData = this.studentForm.value;
      
      const formData: FormData = new FormData();
    
      formData.append('ID', this.studentForm.value.Id);
      formData.append('FirstName', this.studentForm.value.FirstName);
      formData.append('LastName', this.studentForm.value.LastName);
      formData.append('Email', this.studentForm.value.Email);
      formData.append('Phone', this.studentForm.value.Phone);
      formData.append('NIC', this.studentForm.value.NIC);
      formData.append('DOB', this.studentForm.value.DOB);
      formData.append('Address', this.studentForm.value.Address);
      formData.append('Photo', this.profilePicture);
      this.service.addStudent(formData).subscribe(
        (response) => {
          console.log("Student Inserted Successfully", response);
          this.showSuccessMessage('STUDENT RECORD IS CREATED SUCCESSFULLY');
          this.service.allStudents().subscribe(
            (response)=> {
              this.dialogRef.close(formData);
            });
        },
        (error) => {
          console.log("Error in Inserting", error);
        }
      );
    }else {
      console.log("Form is Invalid. Please check the input fields.")
      this.showErrorMessage('PLEASE CHECK THE FORM');
    }
  }

  closeDialog(): void{
    this.dialogRef.close();
  }
}
