import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
 
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WebRequestService } from 'src/app/web-request.service';
import { employe } from 'src/app/model/employe';
  
  @Component({
  selector: 'app-visualiser-employe',
  templateUrl: './visualiser-employe.component.html',
  styleUrls: ['./visualiser-employe.component.scss'],
})
export class VisualiserEmployeComponent implements OnInit {   
 
  emp: employe[];
  id: number;
 
  constructor(private employeservice:WebRequestService, public dialog: MatDialog,  private fb: FormBuilder, private route: ActivatedRoute) {    
      

  }
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];

      this.employeservice.getById(this.id).subscribe((data: employe[])=>{

        console.log(data);
        this.emp=data;

      });
    }
   


  

}
