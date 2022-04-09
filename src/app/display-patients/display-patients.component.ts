import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DataService} from "../services/data.service";
import {SnapshotAction} from "@angular/fire/compat/database";
import {Patient} from "../patient";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AddPatientComponent} from "../add-patient/add-patient.component";
import {DatePipe} from "@angular/common";
import {logEvent} from "@angular/fire/analytics";

@Component({
  selector: 'app-display-patients',
  templateUrl: './display-patients.component.html',
  styleUrls: ['./display-patients.component.css']
})
export class DisplayPatientsComponent implements OnInit {
  public displayedColumns = ['firstName', 'lastName', 'birthdate', 'gender', 'CNP', 'phoneNumber', 'orderNumber', "actions"]
  public dataSource = new MatTableDataSource<Patient>();
  private patient : Patient;

  constructor(private dataService: DataService,
              private dialog: MatDialog) {
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    this.dialog.open(AddPatientComponent, dialogConfig);

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output: ", data);
        const datePipe: DatePipe = new DatePipe('en-US')
        this.patient = {CNP: data.CNP,
          phoneNumber: data.phoneNumber,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          birthdate: datePipe.transform(data.birthdate, 'dd-MMM-YYYY'),
          orderNumber: this.getOrderNumber() + 1
        }
        this.addPatientInformation(this.patient)
      }
    )
  }

  ngOnInit() {
    this.getPatientsInformation()
  }

  getPatientsInformation() {
    this.dataService
      .getAll()
      .valueChanges()
      .subscribe(data => {
          this.dataSource.data = data
          console.log(data)
        }
      )
  }

  getOrderNumber() {
    return this.dataSource.data[this.dataSource.data.length - 1].orderNumber
  }

  addPatientInformation(data: Patient) {
    this.dataService.addPatient(data).then(()=> {
      console.log("Created")
    });
  }
}
