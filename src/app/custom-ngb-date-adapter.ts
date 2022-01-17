import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomNgbDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER_DASH = '-';

  // 1987 to 2530
  fromModel(value: string | null): NgbDateStruct | null {
    console.log({ fuc: 'adapter -> fromModel -> input', value })
    let result = null;
    if (value) {
      const date = value.split(this.DELIMITER_DASH);
      result = {
        day: parseInt(date[2], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[0], 10) + 543
      };
    } else {
      result = null;
    }
    console.log({ fun: 'adapter -> fromModel -> output', result })
    return result;
  }

  // 2530 to 1987
  toModel(date: NgbDateStruct | null): string | null {
    console.log({ fuc: 'adapter -> toModel -> input ', date })
    const result =  date ? (date.year - 543) + this.DELIMITER_DASH + padStartZero(date.month) + this.DELIMITER_DASH + padStartZero(date.day) : null;
    console.log({ fun: 'adapter -> toModel -> output', result })
    return result;
  }
}

function padStartZero(n: number): string {
  return (n + '').padStart(2, '0')
}
