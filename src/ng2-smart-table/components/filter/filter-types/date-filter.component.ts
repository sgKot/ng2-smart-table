import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';

import { DefaultFilter } from './default-filter';

@Component({
  selector: 'date-filter',
  template: `
    <input class="form-control" placeholder="dd-mm-yyyy"
           [(ngModel)]="date"
           [formControl]="inputControl" ngbDatepicker #d="ngbDatepicker"
           (focus)="d.open()"
           [container]="'body'">
  `,
})
export class DateFilterComponent extends DefaultFilter implements OnInit {

  inputControl = new FormControl();
  date: any;

  constructor() {
    super();
  }

  ngOnInit() {
    this.inputControl.valueChanges
      .skip(1)
      .distinctUntilChanged()
      .debounceTime(this.delay)
      .subscribe((value: any) => {
        const month = value.month < 10 ? '0'+value.month : value.month;
        this.filter.emit(`${value.year}-${month}-${value.day}T00:00:00Z`);
      });
  }
}
