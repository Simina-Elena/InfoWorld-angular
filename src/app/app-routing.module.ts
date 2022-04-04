import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DisplayPatientsComponent} from "./display-patients/display-patients.component";
import {AddPatientComponent} from "./add-patient/add-patient.component";

const routes: Routes = [
  {path: 'patients', component: DisplayPatientsComponent},
  {path: 'add-patient', component: AddPatientComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
