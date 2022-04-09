import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {gender, Patient} from "../patient";
import {BirthdateValidators} from "../common/validators/birthdate.validators";
import {DataService} from "../services/data.service";
import {MatTableDataSource} from "@angular/material/table";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})

export class AddPatientComponent implements OnInit {
  selectFieldOptions: any[];
  form: FormGroup;
  private outputData: Patient;

  constructor(private fb: FormBuilder, private dataService: DataService,
              private dialogRef: MatDialogRef<AddPatientComponent>,
              @Inject(MAT_DIALOG_DATA) data : any) {
    this.selectFieldOptions = Object.keys(gender)
  }


  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get birthdate() {
    return this.form.get('birthdate');
  }

  get gender() {
    return this.form.get('gender');
  }

  get CNP() {
    return this.form.get('CNP');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber')
  }

  getErrorMessage() {
    if (this.firstName.hasError('required')) {
      return 'You must enter a value';
    }

    return this.firstName.hasError('firstName') ? 'Not a valid name' : '';
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      birthdate: [null, [Validators.required,
        BirthdateValidators.cannotBeBiggerThanCurrentDate]],
      gender: [null, [Validators.required]],
      CNP: [null, [Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern('^[0-9]*$')]],
      phoneNumber: [null, [Validators.pattern('^[0-9]*$')]],
      orderNumber: [{value: null, disabled: true}]
    })
  }

  saveDetails() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
