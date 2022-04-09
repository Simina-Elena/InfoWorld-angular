import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {gender} from "../patient";
import {BirthdateValidators} from "../common/validators/birthdate.validators";
import {DataService} from "../services/data.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})

export class AddPatientComponent implements OnInit {
  selectFieldOptions: any[];
  form: FormGroup;
  firstNameField: string;
  lastNameField: string;
  phoneNumberField: string;
  genderField: gender;
  CNPField: string;
  birthdateField: Date;
  orderNumberField: number;

  constructor(private fb: FormBuilder, private dataService: DataService,
              private dialogRef: MatDialogRef<AddPatientComponent>,
              @Inject(MAT_DIALOG_DATA) data : any) {
    this.selectFieldOptions = Object.keys(gender)
    if(data !== null) {
      this.firstNameField = data.firstName;
      this.lastNameField = data.lastName;
      this.phoneNumberField = data.phoneNumber;
      this.genderField = data.gender;
      this.CNPField = data.CNP;
      this.birthdateField = new Date(data.birthdate);
      this.orderNumberField = data.orderNumber;
    }
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

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [this.firstNameField, [Validators.required]],
      lastName: [this.lastNameField, [Validators.required]],
      birthdate: [this.birthdateField, [Validators.required,
        BirthdateValidators.cannotBeBiggerThanCurrentDate]],
      gender: [this.genderField, [Validators.required]],
      CNP: [this.CNPField, [Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern('^[0-9]*$')]],
      phoneNumber: [this.phoneNumberField, [Validators.pattern('^[0-9]*$')]],
      orderNumber: [{value: this.orderNumberField, disabled: true}]
    })
  }

  saveDetails() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
