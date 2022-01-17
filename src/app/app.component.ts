import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'angular-ngb-datepicker-thai';
  user = {
    dateOfBirth: '1987-01-01'
  };

  minDate: NgbDateStruct = {
    year: 2400, // ตั้งเป็น พศ.
    month: 1,
    day: 1
  }
  editForm = this.fb.group({
    dateOfBirth: [],
  })

  constructor(private fb: FormBuilder, private calendar: NgbCalendar) {
  }

  ngOnInit(): void {
    this.editForm.patchValue({
      dateOfBirth: this.user.dateOfBirth
    });
  }

  save(){
    this.user.dateOfBirth = this.editForm.get(['dateOfBirth'])!.value
  }
}
