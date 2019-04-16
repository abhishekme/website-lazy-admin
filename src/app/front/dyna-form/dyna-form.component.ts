import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormsModule, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dyna-form',
  templateUrl: './dyna-form.component.html',
  styleUrls: ['./dyna-form.component.css']
})
export class DynaFormComponent implements OnInit {

  public dynaFormConfig : any = [];
  dynaForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.loadConfig();
    console.log(this.dynaFormConfig);

    this.dynaFormConfig.forEach(item => {
        console.log(item);
    });
  }

  loadConfig(){

    this.dynaFormConfig  = [

      {
        "type"  : "text",
        "label":  "Enter First Name",
        "name"  : "first_name",
        "value" : ""
      },
      {
        "type"  : "text",
        "label":  "Enter Email",
        "name"  : "email",
        "value" : ""
      },
      {
        "type"  : "text",
        "label":  "Enter Phone Number(mobile)",
        "name"  : "mobile",
        "value" : ""
      }
    ];
  }
}
