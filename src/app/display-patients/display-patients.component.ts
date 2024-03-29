import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DataService} from "../services/data.service";
import {Patient} from "../patient";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AddPatientComponent} from "../add-patient/add-patient.component";
import {DatePipe} from "@angular/common";
import {map} from "rxjs";
import {DeletePatientComponent} from "../delete-patient/delete-patient.component";
import {capitalizeFirstLetter} from "../common/utils/utility-functions";

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

    dialogConfig.autoFocus = false;
    dialogConfig.width = '25rem';

    dialogConfig.data = {
      title: 'Add patient'
    }
    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          const datePipe: DatePipe = new DatePipe('en-US')
          const patient = {
            CNP: data.CNP,
            phoneNumber: data.phoneNumber,
            firstName: capitalizeFirstLetter(data.firstName),
            lastName: capitalizeFirstLetter(data.lastName),
            gender: data.gender,
            birthdate: datePipe.transform(data.birthdate, 'dd-MMM-YYYY'),
            orderNumber: this.getOrderNumber() + 1
          }
          this.addPatientInformation(patient);
          this.dialog.closeAll();
        }
        this.dialog.closeAll();
      })
  }

  openDialogToEdit(patient: Patient) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.width = '25rem';

    dialogConfig.data = {
      firstName: patient.firstName,
      lastName: patient.lastName,
      phoneNumber: patient.phoneNumber,
      birthdate: patient.birthdate,
      gender: patient.gender,
      CNP: patient.CNP,
      orderNumber: patient.orderNumber,
      title: 'Update patient'
    }
    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          const datePipe: DatePipe = new DatePipe('en-US')
          const updatedPatient = {
            key: patient.key,
            CNP: data.CNP,
            phoneNumber: data.phoneNumber,
            firstName: capitalizeFirstLetter(data.firstName),
            lastName: capitalizeFirstLetter(data.lastName),
            gender: data.gender,
            birthdate: datePipe.transform(data.birthdate, 'dd-MMM-YYYY'),
            orderNumber: patient.orderNumber
          }
          this.updatePatient(updatedPatient);
          this.dialog.closeAll();
        }
        this.dialog.closeAll();
      })
  }

  openDialogToDelete(patient: Patient) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    const dialogRef = this.dialog.open(DeletePatientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.deletePatient(patient);
        this.dialog.closeAll();
      }
      this.dialog.closeAll();
    })
  }

  ngOnInit() {
    this.getPatientsInformation();
  }

  getPatientsInformation() {
    this.dataService
      .getAll()
      .snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getOrderNumber() {
    if (this.dataSource.data.length > 0) {
      return this.dataSource.data[this.dataSource.data.length - 1].orderNumber;
    }
    return 0;
  }

  addPatientInformation(data: any) {
    this.dataService.addPatient(data)
      .then(() => console.log("Patient added successfully!"))
      .catch(err => console.log(err));
  }

  updatePatient(patient: any) {
    this.dataService.updatePatient(patient.key, patient)
      .then(() => console.log('Patient updated successfully!'))
      .catch(err => console.log(err));
  }

  deletePatient(patient: any) {
    if (patient.key) {
      this.dataService.deletePatient(patient.key)
        .then(() => console.log('Patient deleted successfully!'))
        .catch(err => console.log(err));
    }
  }


}
