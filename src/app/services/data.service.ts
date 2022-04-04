import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dbPath = '/patients'
  patientsRef: AngularFireList<any>
  constructor(private db: AngularFireDatabase) { this.patientsRef = db.list(this.dbPath) }

  getAll() : AngularFireList<any> {
    return this.patientsRef
  }
}
