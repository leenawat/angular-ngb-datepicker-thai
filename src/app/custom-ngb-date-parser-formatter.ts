import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const DELIMITER_SLASH = '/';

@Injectable()
export class CustomNgbDateParserFormatter extends NgbDateParserFormatter {

  parse(value: string): NgbDateStruct | null {
    console.log({ fuc: 'formatter -> parse -> input', value })
    let result = null;
    if (value) {
      const date = value.split(DELIMITER_SLASH);
      result = {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    console.log({ fuc: 'formatter -> parse -> output', result })
    return result;
  }

  format(date: NgbDateStruct | null): string {
    console.log({ fuc: 'formatter -> format -> input', date })
    const result = date ? padStartZero(date.day) + DELIMITER_SLASH + padStartZero(date.month) + DELIMITER_SLASH + date.year : '';
    console.log({ fuc: 'formatter -> format -> output', result })
    return result;
  }
}

function padStartZero(n: number): string {
  return (n + '').padStart(2, '0')
}
