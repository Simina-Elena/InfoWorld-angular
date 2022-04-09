import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DataService} from "../services/data.service";
import {SnapshotAction} from "@angular/fire/compat/database";
import {Patient} from "../patient";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AddPatientComponent} from "../add-patient/add-patient.component";
import {DatePipe} from "@angular/common";
import {logEvent} from "@angular/fire/analytics";
import {map} from "rxjs";

@Component({
  selector: 'app-display-patients',
  templateUrl: './display-patients.component.html',
  styleUrls: ['./display-patients.component.css']
})
export class DisplayPatientsComponent implements OnInit {
  public displayedColumns = ['firstName', 'lastName', 'birthdate', 'gender', 'CNP', 'phoneNumber', 'orderNumber', "actions"]
  public dataSource = new MatTableDataSource<Patient>();

  constructor(private dataService: DataService,
              private dialog: MatDialog) {
  }

  openDialogToAdd() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    this.openAddPatientDialog(dialogConfig);
  }

  openDialogToEdit(patient: Patient) {
    const dialogConfig = new MatDialogConfig();
    console.log(patient)

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    this.openEditPatientDialog(dialogConfig, patient);
  }

  ngOnInit() {
    this.getPatientsInformation()
  }

  openAddPatientDialog(dialogConfig: MatDialogConfig) {
    this.dialog.open(AddPatientComponent, dialogConfig);

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output: ", data);
        const datePipe: DatePipe = new DatePipe('en-US')
        const patient = {
          CNP: data.CNP,
          phoneNumber: data.phoneNumber,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          birthdate: datePipe.transform(data.birthdate, 'dd-MMM-YYYY'),
          orderNumber: this.getOrderNumber() + 1
        }
        this.addPatientInformation(patient)
      })
  }

  openEditPatientDialog(dialogConfig: MatDialogConfig, patient: Patient) {
    dialogConfig.data = {
      firstName: patient.firstName,
      lastName: patient.lastName,
      phoneNumber: patient.phoneNumber,
      birthdate: patient.birthdate,
      gender: patient.gender,
      CNP: patient.CNP,
      orderNumber: patient.orderNumber
    }
    this.dialog.open(AddPatientComponent, dialogConfig);

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output: ", data);
        const datePipe: DatePipe = new DatePipe('en-US')
        const updatedPatient = {
          key: patient.key,
          CNP: data.CNP,
          phoneNumber: data.phoneNumber,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          birthdate: datePipe.transform(data.birthdate, 'dd-MMM-YYYY'),
          orderNumber: patient.orderNumber
        }
        this.updatePatient(updatedPatient)
      })
  }

  getPatientsInformation() {
    this.dataService
      .getAll()
      .snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getOrderNumber() {
    console.log(this.dataSource.data.length)
    if (this.dataSource.data.length > 0) {
      return this.dataSource.data[this.dataSource.data.length - 1].orderNumber
    }
    return 0;
  }

  addPatientInformation(data: any) {
    this.dataService.addPatient(data)
      .then(() => console.log("Patient added successfully!"))
      .catch(err => console.log(err));
  }

  updatePatient(element: any) {
    this.dataService.updatePatient(element.key, element)
      .then(() => console.log('Patient updated successfully!'))
      .catch(err => console.log(err));
  }
}
