import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { formatDate, FormStyle, getLocaleDayNames, getLocaleMonthNames, TranslationWidth } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeThai from '@angular/common/locales/th';

const DELIMITER_SLASH = '/';
const DELIMITER_DASH = '-'

registerLocaleData(localeThai);

@Injectable()
export class CustomNgbDateAdapter extends NgbDateAdapter<string> {

  // 1987 to 2530
  fromModel(value: string | null): NgbDateStruct | null {
    // console.log({ fuc: 'adapter -> fromModel -> input', value })
    let result = null;
    if (value) {
      const date = value.split(DELIMITER_DASH);
      result = {
        day: parseInt(date[2], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[0], 10) + 543
      };
    } else {
      result = null;
    }
    // console.log({ fun: 'adapter -> fromModel -> output', result })
    return result;
  }

  // 2530 to 1987
  toModel(date: NgbDateStruct | null): string | null {
    // console.log({ fuc: 'adapter -> toModel -> input ', date })
    const result = date ? (date.year - 543) + DELIMITER_DASH + padStartZero(date.month) + DELIMITER_DASH + padStartZero(date.day) : null;
    // console.log({ fun: 'adapter -> toModel -> output', result })
    return result;
  }
}

@Injectable()
export class CustomNgbDateParserFormatter extends NgbDateParserFormatter {

  parse(value: string): NgbDateStruct | null {
    // console.log({ fuc: 'formatter -> parse -> input', value })
    let result = null;
    if (value) {
      const date = value.split(DELIMITER_SLASH);
      result = {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    // console.log({ fuc: 'formatter -> parse -> output', result })
    return result;
  }

  format(date: NgbDateStruct | null): string {
    // console.log({ fuc: 'formatter -> format -> input', date })
    const result = date ? padStartZero(date.day) + DELIMITER_SLASH + padStartZero(date.month) + DELIMITER_SLASH + date.year : '';
    // console.log({ fuc: 'formatter -> format -> output', result })
    return result;
  }
}

@Injectable()
export class CustomNgbDatepickerI18n extends NgbDatepickerI18n {

  private _locale = 'th';
  private _weekdaysShort: readonly string[];
  private _monthsShort: readonly string[];
  private _monthsFull: readonly string[];

  constructor() {
    super();
    const weekdaysStartingOnSunday = getLocaleDayNames(this._locale, FormStyle.Standalone, TranslationWidth.Short);
    this._weekdaysShort = weekdaysStartingOnSunday.map((day, index) => weekdaysStartingOnSunday[(index + 1) % 7]);

    this._monthsShort = getLocaleMonthNames(this._locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
    this._monthsFull = getLocaleMonthNames(this._locale, FormStyle.Standalone, TranslationWidth.Wide);
  }

  getMonthShortName(month: number): string { return this._monthsShort[month - 1] || ''; }

  getMonthFullName(month: number): string { return this._monthsFull[month - 1] || ''; }

  getWeekdayLabel(weekday: number) {
    return this._weekdaysShort[weekday - 1] || '';
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return formatDate(jsDate, 'fullDate', this._locale);
  }

  override getYearNumerals(year: number): string { return String(year); }
}

export function padStartZero(n: number): string {
  return (n + '').padStart(2, '0')
}
