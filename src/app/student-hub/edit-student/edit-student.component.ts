import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from 'src/Models/student.model';
import { SharedService } from 'src/services/shared/shared.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {
  students : any[] = [];
  imageUrl: string | ArrayBuffer | null = null;
  editForm: FormGroup;
  profilePicture!: File;
  submitted = false;
  Photo: FormControl = new FormControl(null, Validators.required);
  blob!: Blob;
  constructor(
    public dialogRef: MatDialogRef<EditStudentComponent>,
    private fb: FormBuilder,
    private http: HttpClient,
    private service: SharedService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Student,
  ) {
      this.editForm = this.fb.group({
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
    if (this.data) {
      this.editForm.patchValue(this.data);
      this.loadImage(this.data.photo);
    }
  }
 
  onFileSelected(event: any) {
    this.profilePicture = <File>event.target.files[0];
  }
  loadImage(photo: string | null): void {
    if (photo) {
      this.imageUrl = `data:image/jpeg;base64,${photo}`;
      this.blob = this.dataURItoBlob(this.imageUrl);
    } else {
     
      this.imageUrl = null;
    }
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

    dataURItoBlob(dataURI: string): Blob {
      // Split the base64 string to get the data part
      const byteString = atob(dataURI.split(',')[1]);
    
      // Separate out the mime component
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
      // Convert to byte array
      const byteNumbers: number[] = [];
      for (let i = 0; i < byteString.length; i++) {
        byteNumbers.push(byteString.charCodeAt(i));
      }
    
      // Create Blob object
      return new Blob([new Uint8Array(byteNumbers)], { type: mimeString });
    }
    
    saveChanges(): void{
    
        this.submitted = true;
        if(this.editForm.valid){
          const formData: FormData = new FormData();

          const formDataValues = this.editForm.value;
          console.log(formDataValues);
          const updatedData = this.editForm.value;
          const id = updatedData.Id;
          formData.append('ID', this.editForm.value.Id);
          formData.append('FirstName', this.editForm.value.FirstName);
          formData.append('LastName', this.editForm.value.LastName);
          formData.append('Email', this.editForm.value.Email);
          formData.append('Phone', this.editForm.value.Phone);
          formData.append('NIC', this.editForm.value.NIC);
          formData.append('DOB', this.editForm.value.DOB);
          formData.append('Address', this.editForm.value.Address);
          // if (this.profilePicture) {
          //   formData.append('Photo', this.profilePicture);
          // } else {
            
          //   formData.append('Photo', this.blob);
          // }
          
          this.service.editStudent(this.editForm.value.Id,formDataValues).subscribe(
            (response) => {
              console.log("Student Edited Successfully", response);
              this.showSuccessMessage('STUDENT RECORD IS Edited SUCCESSFULLY');
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
  
    }
