import { registerLocaleData } from '@angular/common';
import localeThai from '@angular/common/locales/th';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCalendar, NgbCalendarBuddhist, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CustomNgbDateAdapter } from './custom-ngb-date-adapter';
import { CustomNgbDateParserFormatter } from './custom-ngb-date-parser-formatter';
import { CustomNgbDatepickerI18n } from './custom-ngb-datepicker-i18n';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarBuddhist },
    { provide: NgbDateAdapter, useClass: CustomNgbDateAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomNgbDateParserFormatter },
    { provide: NgbDatepickerI18n, useClass: CustomNgbDatepickerI18n },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    registerLocaleData(localeThai);
  }
}
