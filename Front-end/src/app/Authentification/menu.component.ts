import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmployeServiceService } from '../rh/employe/Service/employe-service.service';


@Component({
  selector: 'app-rh',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class ConnexionComponent implements OnInit {


Informations_Generales_Form: FormGroup;

constructor(public service: EmployeServiceService, private fb: FormBuilder ) {


  this.Informations_Generales_Form = this.fb.group({
    Email: [],
    Password:[],
  });

   this.service.ListerPays().subscribe((reponse: Response) => {});
}

MessageErreurEmail() {
  if (this.Informations_Generales_Form.get('Email').hasError('required')) {
    return 'Vous devez entrer une adresse email!';
  }
}

MessageErreurPassword() {
  if (this.Informations_Generales_Form.get('Password').hasError('required')) {
    return 'Vous devez entrer un mot de passe!';
  }
}

ngOnInit(): void {
}

 
}