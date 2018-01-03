import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results_service/results.service';
import {isNullOrUndefined} from 'util';
import { SingleResultResponse } from '../../responses/single_result';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  steps: number;
  results: SingleResultResponse[];

  constructor(private resultsService: ResultsService) { }

  ngOnInit() {
  }

  compute() {
    if (isNullOrUndefined(this.steps)) {
      this.steps = 0;
    }
    this.resultsService.compute(this.steps).then(response => {
      this.results = response.results;
    });
  }

}
