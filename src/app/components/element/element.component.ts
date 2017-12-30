import { Component, OnInit, Input } from '@angular/core';
import { CircuitElement } from '../../classes/circuit_element';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  @Input() element: CircuitElement;

  constructor() { }

  ngOnInit() {
  }

}
