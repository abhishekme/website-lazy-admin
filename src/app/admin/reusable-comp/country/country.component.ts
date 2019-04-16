
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Path } from '../../services/config/path';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {

  path: Path;
  property:any = 0;
  @Input()  data: any;
  @Output() OnSelectionChange = new EventEmitter();

  constructor() { 
  }

  loadState(event){
     this.OnSelectionChange.emit({countryId: event.target.selectedIndex});
  }

}
