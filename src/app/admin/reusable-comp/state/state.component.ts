import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  @Input()  data: any;
  @Output() OnSelectionChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  loadState(event){
     this.OnSelectionChange.emit({stateId: event.target.selectedIndex});
  }

}
