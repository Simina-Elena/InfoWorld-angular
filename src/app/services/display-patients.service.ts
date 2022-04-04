import { Injectable } from '@angular/core';
import {Patient} from "../patient";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DisplayPatientsService {

  constructor(private httpClient: HttpClient) { }

  getPatientsInformation(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`${environment.baseUrl}patients.json`)
  }
}
