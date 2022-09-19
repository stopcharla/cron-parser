import { describe, expect, test } from '@jest/globals';
import { CronField } from "../field";
import { CronFields } from "../types";

describe('testing parsers', () => {
  test('checking minutes step increment values', () => {
    let cronField = new CronField(CronFields.MINUTES, '*/15');
    expect(cronField.getText().trim()).toEqual(`${CronFields.MINUTES.type} 0 15 30 45 60`);
  })

  test('checking minutes fixed values', () => {
    let cronField = new CronField(CronFields.MINUTES, '1,2,3,4');
    expect(cronField.getText().trim()).toEqual(`${CronFields.MINUTES.type} 1 2 3 4`);
  })

  test('checking minutes range values', () => {
    let cronField = new CronField(CronFields.MINUTES, '1-4');
    expect(cronField.getText().trim()).toEqual(`${CronFields.MINUTES.type} 1 2 3 4`);
  })

  test('checking minutes single value', () => {
    let cronField = new CronField(CronFields.MINUTES, '1');
    expect(cronField.getText().trim()).toEqual(`${CronFields.MINUTES.type} 1`);
  })

  test.each(['*/2/3', '1-0', '1/2', '61', 'a-b', 'a', '*/a'])('checking errors', (text) => {
    expect(() => new CronField(CronFields.MINUTES, text)).toThrow(Error);
  })
})