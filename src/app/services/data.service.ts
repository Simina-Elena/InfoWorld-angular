import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {Patient} from "../patient";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dbPath = '/patients'
  patientsRef: AngularFireList<Patient>
  constructor(private db: AngularFireDatabase) { this.patientsRef = db.list(this.dbPath) }

  getAll() : AngularFireList<Patient> {
    return this.patientsRef;
  }

  addPatient(patient: Patient) {
    return this.patientsRef.push(patient);
  }

  updatePatient(key: string, value: any): Promise<void> {
    return this.patientsRef.update(key, value);
  }

  deletePatient(key: string): Promise<void> {
    return this.patientsRef.remove(key);
  }
}
