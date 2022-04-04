import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DataService} from "../services/data.service";
import {SnapshotAction} from "@angular/fire/compat/database";

@Component({
  selector: 'app-display-patients',
  templateUrl: './display-patients.component.html',
  styleUrls: ['./display-patients.component.css']
})
export class DisplayPatientsComponent implements OnInit {
  public displayedColumns = ['firstName', 'lastName', 'birthdate', 'gender', 'CNP', 'phoneNumber', 'orderNumber', "actions"]
  public dataSource = new MatTableDataSource<SnapshotAction<any>>()

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.getPatientsInformation()
  }

  getPatientsInformation() {
    this.dataService
      .getAll()
      .valueChanges()
      .subscribe(data => this.dataSource.data = data)
  }
}
