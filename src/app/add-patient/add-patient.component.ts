import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors} from "@angular/forms";
import {gender} from "../patient";
import {BirthdateValidators} from "../common/validators/birthdate.validators";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})

export class AddPatientComponent implements OnInit {
  selectFieldOptions: any[];
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthdate: new FormControl('', [Validators.required, BirthdateValidators.cannotBeBiggerThanCurrentDate]),
    gender: new FormControl('', Validators.required),
    CNP: new FormControl('', Validators.minLength(13)),
    phoneNumber: new FormControl(),
    orderNumber: new FormControl()
  })

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

  constructor() {
    this.selectFieldOptions = Object.keys(gender)
  }

  ngOnInit(): void {
  }

}
